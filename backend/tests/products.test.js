const request = require('supertest');
const app = require('../server'); // Importamos tu servidor
const mongoose = require('mongoose');

// Configuración inicial
beforeAll(async () => {
    // Nos aseguramos de conectar a la base de datos
    await mongoose.connect(process.env.MONGO_URI);
});

// Limpieza final
afterAll(async () => {
    // Cerramos la conexión para que la prueba termine bien
    await mongoose.connection.close();
});

describe('Pruebas del Inventario KarlDay', () => {
    let token;
    // Usamos un usuario único para no chocar con los existentes
    const testUser = {
        username: `tester_${Date.now()}`,
        password: 'password123'
    };

    // 1. Prueba de Registro y Login
    it('Debe registrar usuario y devolver token', async () => {
        // Registrar
        await request(app).post('/api/auth/register').send(testUser);
        
        // Loguear
        const res = await request(app).post('/api/auth/login').send(testUser);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token; // Guardamos el token
    });

    // 2. Prueba de Crear Producto
    it('Debe permitir agregar una prenda nueva', async () => {
        const res = await request(app)
            .post('/api/products')
            .set('Authorization', token) // Usamos el token del paso anterior
            .send({
                name: 'Bufanda Test Jest',
                price: 250,
                category: 'Accesorios'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual('Bufanda Test Jest');
    });

    // 3. Prueba de Ver Productos
    it('Debe mostrar la lista de prendas', async () => {
        const res = await request(app)
            .get('/api/products')
            .set('Authorization', token);

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });
});