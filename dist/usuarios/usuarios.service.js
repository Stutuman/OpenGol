"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const usuario_entity_1 = require("./entities/usuario.entity");
const bcrypt = __importStar(require("bcrypt"));
let UsuariosService = class UsuariosService {
    usuarioRepository;
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    async obtenerPerfil(id) {
        const usuario = await this.usuarioRepository.findOneBy({ id });
        if (!usuario) {
            throw new common_1.NotFoundException('usuario no encontrado');
        }
        const { password_hash, ...usuarioSeguro } = usuario;
        return usuarioSeguro;
    }
    async eliminar() {
        return 'yo elimino el usuario';
    }
    async registrar(datosUsuario) {
        try {
            const { nombre, email, password, telefono } = datosUsuario;
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);
            const nuevoUsuario = this.usuarioRepository.create({
                nombre,
                email,
                password_hash: passwordHash,
                telefono,
            });
            await this.usuarioRepository.save(nuevoUsuario);
            const { password_hash, ...usuarioSeguro } = nuevoUsuario;
            return {
                mensaje: '¡Usuario registrado con éxito para jugar!',
                usuario: usuarioSeguro
            };
        }
        catch (error) {
            console.error(error);
            if (error.code === '23505') {
                throw new common_1.ConflictException('Este correo electrónico ya está registrado en openGol. ¡Intentá iniciar sesión!');
            }
            throw new common_1.InternalServerErrorException('Hubo un error al registrar el usuario');
        }
    }
    async buscarPorEmail(email) {
        return this.usuarioRepository.findOne({
            where: { email: email }
        });
    }
    async actualizar(id, datosActualizar) {
        const usuarioEncontrado = await this.usuarioRepository.findOneBy({ id });
        if (!usuarioEncontrado) {
            throw new common_1.NotFoundException(`El jugador con ID ${id} no existe`);
        }
        if (datosActualizar.password) {
            const saltRounds = 10;
            usuarioEncontrado.password_hash = await bcrypt.hash(datosActualizar.password, saltRounds);
            delete datosActualizar.password;
        }
        const usuarioModificado = this.usuarioRepository.merge(usuarioEncontrado, datosActualizar);
        await this.usuarioRepository.save(usuarioModificado);
        const { password_hash, ...usuarioSeguro } = usuarioModificado;
        return {
            mensaje: '¡Perfil actualizado correctamente!',
            usuario: usuarioSeguro,
        };
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map