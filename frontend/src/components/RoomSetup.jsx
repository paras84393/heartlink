import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function RoomSetup({ setRoom }) {

  const [inviteCode, setInviteCode] = useState("")
  const [createdCode, setCreatedCode] = useState("")
  const [waiting, setWaiting] = useState(false)

  const navigate = useNavigate()

  const createRoom = async () => {
    try {

      const res = await fetch("http://localhost:5000/api/room/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await res.json()

      if (data.inviteCode) {
        setCreatedCode(data.inviteCode)
        setWaiting(true)
      }

    } catch (err) {
      console.log(err)
    }
  }

  const joinRoom = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/room/join", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          code: inviteCode
        })
      })

      const data = await res.json()

      if (data.message === "Joined room") {
        navigate("/dashboard")
      }

    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {

    if (!waiting) return

    const interval = setInterval(async () => {

      const res = await fetch("http://localhost:5000/api/room/my-room", {
        credentials: "include"
      })

      const room = await res.json()

      if (room?.partner) {
        setRoom(room)
        navigate("/dashboard")
      }

    }, 2000)

    return () => clearInterval(interval)

  }, [waiting])

  return (

    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-[#0f172a] text-white">

      <h1 className="text-3xl font-bold">
        Create or Join Room
      </h1>

      <button
        onClick={createRoom}
        className="bg-pink-500 px-6 py-2 rounded"
      >
        Create Room
      </button>

      {createdCode && (
        <div className="bg-gray-800 p-4 rounded text-center">
          <p className="text-lg">Invite Code</p>
          <p className="text-2xl font-bold text-pink-400">
            {createdCode}
          </p>
          <p className="text-sm text-gray-300">
            Waiting for your partner to join...
          </p>
        </div>
      )}

      <input
        placeholder="Enter invite code"
        value={inviteCode}
        onChange={(e) => setInviteCode(e.target.value)}
        className="text-black p-2 rounded"
      />

      <button
        onClick={joinRoom}
        className="bg-blue-500 px-6 py-2 rounded"
      >
        Join Room
      </button>

    </div>

  )
}

export default RoomSetup