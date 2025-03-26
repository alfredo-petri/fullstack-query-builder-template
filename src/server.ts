import express, { Request, Response } from "express"
import { knex } from "./database/knex"

const app = express()
app.use(express.json())

app.get("/courses", async (request: Request, response: Response) => {
    
    const courses = await knex("courses").select().orderBy('name', 'asc')
    // const courses = await knex.raw(`SELECT * FROM courses ORDER BY name ASC`)
    
    return response.json(courses.length ? courses : 'Não há cursos cadastrados' )
})

app.post("/courses", async (request: Request, response: Response) => {
    const {name} = request.body
    
    await knex("courses").insert({ name })
    // await knex.raw(`UPDATE courses SET name = ${name}  VALUES `)
    
    return response.status(201).json()
})

app.listen(3333, () => console.log(`Server is running on port 3333`))
