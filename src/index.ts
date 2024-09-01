import { Server } from "./server"

const server = new Server().app
const PORT = 3333

server.listen(PORT, ()=>{
  console.log(`Server is running on PORT ${PORT}`)
})