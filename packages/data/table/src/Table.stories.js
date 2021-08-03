import BaseTable from './Table.vue'
import '@/style/reset.less'

export default {
  title: '数据展示组件/ 表格',
  component: BaseTable,
  argTypes: {
    data: []
  }
}

const Template1 = args => ({
  components: { BaseTable },
  setup () {
    return { args }
  },
  template: `
    <BaseTable>
      <template #name="record">
        <span>{{record.name}}</span>
      </template>
    </BaseTable>`
})

export const 基本用法 = Template1.bind({})
基本用法.args = {
  columns: [
    {
      dataIndex: 'name',
      key: 'name',
      slots: { title: 'customTitle' },
      scopedSlots: { customRender: 'name' }
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      scopedSlots: { customRender: 'tags' }
    },
    {
      title: 'Action',
      key: 'action',
      scopedSlots: { customRender: 'action' }
    }
  ],

  dataSource: [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    }
  ]
}

const Template = (args) => ({
  components: { BaseTable },
  setup () {
    return { args }
  },
  template: `
      <BaseTable>
        <template v-slot="record">
          <span>{{record.name}}</span>
        </template>
        <template #action=" { record }">
          <span>
            <a>Invite 一 {{ record.name }}</a>
            <a>Delete</a>
            <a class="ant-dropdown-link">
              More actions
              <down-outlined />
            </a>
          </span>
        </template>
      </BaseTable>`
})

export const Table = Template.bind({})
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    children: [
      {
        title: 'Attack',
        dataIndex: 'attack',
        key: 'attack',
        children: [
          {
            title: 'Physics Attack',
            dataIndex: 'physicsAttack',
            key: 'physicsAttack'
          },
          {
            title: 'Magic Attack',
            dataIndex: 'magicAttack',
            key: 'magicAttack'
          }
        ]
      },
      {
        title: 'Defend',
        dataIndex: 'defend',
        key: 'defend'
      },
      {
        title: 'Speed',
        dataIndex: 'speed',
        key: 'speed'
      }
    ]
  }
]

function createData () {
  return Array.apply(null, { length: 5 }).map((_, i) => {
    return {
      key: i,
      name: `name_${i}`,
      physicsAttack: `physicsAttack_${i}`,
      magicAttack: `magicAttack_${i}`,
      defend: `defend_${i}`,
      speed: `speed_${i}`
    }
  })
}
Table.args = {
  columns,
  dataSource: createData()
}
