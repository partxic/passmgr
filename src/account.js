import express from 'express'
const account = express.Router()

import { getenv } from './cfenv.js'
const env = getenv()

import { needauth } from './auth.js'

account.get('/list', needauth, async (req, res) => {
    const result = await env.data.list()
    return res.status(200).json(result.keys.map(item => item.name))
})

account.get('/info', needauth, async (req, res) => {
    const name = req.query.name
    if (typeof name !== 'string' || name === '') {
        return res.status(400).send('参数错误')
    }

    const result = await env.data.get(name)
    if (!result) {
        return res.status(404).send('未找到')
    }

    return res.status(200).json(JSON.parse(result))
})

account.get('/delete', needauth, async (req, res) => {
    const name = req.query.name
    if (typeof name !== 'string' || name === '') {
        return res.status(400).send('参数错误')
    }

    await env.data.delete(name)
    return res.status(200).send('操作成功')
})

account.post('/set', needauth, async (req, res) => {
    const name = req.query.name
    if (typeof name !== 'string' || name === '') {
        return res.status(400).send('参数错误')
    }

    const { username, password, totp, note } = req.body

    if (typeof username !== 'string' || username === '' || typeof password !== 'string' || password === '') {
        return res.status(400).send('数据错误')
    }

    if (typeof totp !== 'string' || typeof note !== 'string') {
        return res.status(400).send('格式错误')
    }

    await env.data.put(name, JSON.stringify({ username, password, totp, note }))
    return res.status(200).send('操作成功')
})

export default account
