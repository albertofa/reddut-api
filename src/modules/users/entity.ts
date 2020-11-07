import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
  	OneToMany,
  	getConnection
} from 'typeorm';

import { Post } from '../posts/entity' 

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	username: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@OneToMany(type => Post, post => post.user)
	posts: Post[];

	private constructor(username: string, email: string, password: string){

		this.username = username
		this.email = email
		this.password = password
	}

	public static async get(id: string): Promise<User>{
		const connection = await getConnection();
	
		return await connection.getRepository(User).findOne(id)
	}

	public static async create(username: string, email: string, password: string): Promise<User>{
		const connection = await getConnection();
	
		const user = new User(username, email, password)
		return await connection.getRepository(User).save(user)
	}

	public static async findByUsername(username: string): Promise<User>{
		const connection = await getConnection();
	
		return await connection.getRepository(User).findOne({username: username})
	}

	public static async findByEmail(email: string): Promise<User>{
		const connection = await getConnection();
	
		return await connection.getRepository(User).findOne({email: email})
	}
	
	async update(user: User): Promise<User>{
		const connection = await getConnection();

		this.email = user.email
		this.username = user.username

		return await connection.getRepository(User).save(this)
	}
}

