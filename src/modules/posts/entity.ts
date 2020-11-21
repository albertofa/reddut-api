import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
  	ManyToOne,
  	JoinColumn,
		getConnection,
		Like
} from 'typeorm';
import { Subreddut } from '../subreddut/entity';
import { User } from '../users/entity'

@Entity()
export class Post {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	title: string

	@Column()
	content: string

	@ManyToOne(() => User, user => user.posts)
	@JoinColumn({name: 'user_id', referencedColumnName: 'id'})
	user: User;

	@ManyToOne(() => User, user => user.posts)
	@JoinColumn({name: 'sub_reddut_id', referencedColumnName: 'id'})
	subreddut: Subreddut;
	
	private constructor (title: string, content: string, user: User, subreddut: Subreddut) {

		this.title = title
		this.content = content
		this.user = user
		this.subreddut = subreddut
	}

	public static async create(title: string, content: string, user: User, subreddut: Subreddut): Promise<Post>{
		const connection = await getConnection();
		
		const post = new Post(title, content, user, subreddut)
		
		return await connection.getRepository(Post).save(post)
	}

	public static async get(id: string): Promise<Post>{
		const connection = await getConnection();
	
		return await connection.getRepository(Post).findOne(id)
	}

	public static async list(title?: string, user_id?: string, subreddut?: string): Promise<Post[]>{
		const connection = await getConnection();
		
		const postRepository = await connection.getRepository(Post)

		if(!title)
			title = ''

		return postRepository.find({
			where: {
				title: Like(`%${title}%`)
			}
		})
	}
}
