import { Action, Data, Node, Type } from '@brainote/domain'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'

import { AutoMap } from '../utils/automap'

type Table = Map<NodeId, Data>

@Injectable()
export class NodesService {
  datas: AutoMap<NodeId, Table>

  nodes: Map<NodeId, Node>
  types: Map<NodeId, Type.Any>

  constructor() {
    this.datas = new AutoMap(() => new Map())

    this.nodes = new Map()
    this.types = new Map()

    this.datas.set('node', this.nodes as any)
    this.datas.set('type', this.types as any)

    const folderA = this.create({
      name: 'Folder A',
      tags: [],
    })
    const folderB = this.create({
      name: 'Folder B',
      tags: [],
    })
    const folderC = this.create({
      name: 'Folder C',
      tags: [],
    })

    this.create({
      name: 'Node A',
      tags: [folderA.id, folderB.id],
    })
    this.create({
      name: 'Node B',
      tags: [folderB.id, folderC.id],
    })
  }

  create({ name, tags }: Action.Payload.Create): Node {
    const id = v4()

    const creation = Date.now()
    const modification = creation

    const node: Node = {
      id,

      name,
      tags,
      data: [],

      creation,
      modification,
    }

    this.nodes.set(id, node)

    return node
  }

  findAll() {
    return [...this.nodes.values()]
  }

  findOne(node: NodeId) {
    return this.nodes.get(node)
  }

  update({ id, name }: Action.Payload.Update) {
    return this.patch(id, node => {
      node.name = name
    })
  }

  tagAdd({ node, tag }: Action.Tag.Payload.Add) {
    return this.patch(node, node => {
      node.tags.push(tag)
    })
  }
  tagMove({ node, tag, index }: Action.Tag.Payload.Move) {
    return this.patch(node, node => {
      const position = node.tags.indexOf(tag)

      if (position < index) {
        node.tags.splice(index, 0, tag)
        node.tags.splice(position, 1)
      } else {
        node.tags.splice(position, 1)
        node.tags.splice(index, 0, tag)
      }
    })
  }
  tagRemove({ node, tag }: Action.Tag.Payload.Remove) {
    return this.patch(node, node => {
      node.tags = node.tags.filter(item => item != tag)
    })
  }

  delete(id: Action.Payload.Delete) {
    if (this.isTagged(id)) throw new Error()

    return this.nodes.delete(id)
  }

  private patch(id: NodeId, patcher: (node: Node) => void) {
    const node = this.nodes.get(id)

    if (!node) throw new Error()

    patcher(node)

    return node
  }

  private isTagged(id: NodeId) {
    return [...this.nodes.values()].some(node => node.tags.includes(id))
  }
}
