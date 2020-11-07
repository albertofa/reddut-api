import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
  	ManyToOne,
  	JoinColumn,
	getConnection,
	CreateDateColumn
} from 'typeorm';

@Entity()
export class Subreddut {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	key: string

	@CreateDateColumn()
	created_at: Date;

	@CreateDateColumn()
	updated_at: Date;
	
	private constructor (key: string) {
		this.key = key
	}

	public static async create(key: string): Promise<Subreddut>{
		const connection = await getConnection();
		
		const sub = new Subreddut(key)

		return await connection.getRepository(Subreddut).save(sub)
	}

	public static async get(id: string): Promise<Subreddut>{
		const connection = await getConnection();
	
		return await connection.getRepository(Subreddut).findOne(id)
	}
}
