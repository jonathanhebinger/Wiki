import { Node as iNode } from '@brainote/domain'
import { Column, CreateDateColumn, ObjectIdColumn, UpdateDateColumn } from 'typeorm'

export class Node implements iNode {
  @ObjectIdColumn()
  id: string

  @Column()
  name: string
  @Column()
  tags: string[]
  @Column()
  content: any
  @Column()
  data: iNode.Data[]

  @CreateDateColumn()
  creation: number
  @UpdateDateColumn()
  modification: number
}
