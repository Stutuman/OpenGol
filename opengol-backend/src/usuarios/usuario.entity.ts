import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Le decimos que esta clase representa a la tabla "usuarios" que armaste en pgAdmin
@Entity('usuarios') 
export class Usuario {
  
  // Esto avisa que es el ID principal y se autoincrementa (SERIAL)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  // unique: true evita que dos personas se registren con el mismo mail
  @Column({ length: 150, unique: true })
  email: string;

  @Column({ length: 255 })
  password_hash: string;

  // nullable: true significa que este campo no es obligatorio
  @Column({ length: 20, nullable: true })
  telefono: string;

  @Column({ length: 50, default: 'Amateur' })
  nivel_juego: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro: Date;
}