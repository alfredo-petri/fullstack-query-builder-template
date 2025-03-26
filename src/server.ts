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

app.patch("/courses/:id", async (request: Request, response: Response) => {
    const { id } = request.params
    const { name } = request.body
    
    // console.log(knex.fn.)

    await knex("courses").update({ name, updated_at:  knex.fn.now() }).where({id})
    // await knex.raw(`UPDATE courses SET name = "${name}", updated_at = ${knex.fn.now()}   WHERE id = ${id} `)
    
    const course = await knex("courses").select().where({id})

    return response.status(200).json({message: 'Curso atualizado com sucesso', course: course[0]})
})

app.listen(3333, () => console.log(`Server is running on port 3333`))
