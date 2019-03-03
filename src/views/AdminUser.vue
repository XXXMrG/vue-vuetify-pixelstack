<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card
          color="green"
          flat
          full-width
          title="Table on Plain Background"
          text="Here is a subtitle for this table"
        >
          <v-data-table :headers="headers" :items="items.slice(0, 7)" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
            </template>
            <template slot="items" slot-scope="{ item }">
              <td>{{ item.name }}</td>
              <td>{{ item.country }}</td>
              <td>{{ item.city }}</td>
              <td class="text-xs-right">{{ item.salary }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>

      <v-flex xs12>
        <material-card class="card-tabs" color="green">
          <v-flex slot="header">
            <v-tabs v-model="tabs" color="transparent" slider-color="white">
              <span class="subheading font-weight-light mr-3" style="align-self: center">Tasks:</span>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-bug</v-icon>Bugs
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-code-tags</v-icon>Website
              </v-tab>
              <v-tab>
                <v-icon class="mr-2">mdi-cloud</v-icon>Server
              </v-tab>
            </v-tabs>
          </v-flex>
          <v-flex xs4 offset-xs8>
            <v-text-field
              v-model="search"
              label="Search"
              append-icon="mdi-account-search"
              single-line
              hide-details
            ></v-text-field>
          </v-flex>
          <v-tabs-items v-model="tabs">
            <v-tab-item v-for="n in 3" :key="n">
              <v-data-table :headers="headers" :items="items" :search="search">
                <template slot="headerCell" slot-scope="{ header }">
                  <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
                </template>
                <template slot="items" slot-scope="{ item }">
                  <td>{{ item.uid }}</td>
                  <td>{{ item.username }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.authority }}</td>
                  <td>
                    <v-edit-dialog  lazy @save="save(item.uid, item.status)">
                      {{ item.status }}
                      <template v-slot:input>
                        <v-select v-model="item.status" :items="status" label="封禁或解封账户"></v-select>
                      </template>
                    </v-edit-dialog>
                  </td>
                </template>
                <v-alert
                  v-slot:no-results
                  :value="true"
                  color="error"
                  icon="warning"
                >Your search for "{{ search }}" found no results.</v-alert>
              </v-data-table>
            </v-tab-item>
          </v-tabs-items>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    search: "",
    tabs: 0,
    status: ["normal", "frozen", "terminate"],
    headers: [
      {
        sortable: false,
        text: "uid",
        value: "uid"
      },
      {
        sortable: false,
        text: " 用户名",
        value: "username"
      },
      {
        sortable: false,
        text: "用户邮箱",
        value: "email"
      },
      {
        sortable: false,
        text: "用户权限",
        value: "authority"
      },
      {
        sortable: false,
        text: "用户账号状态",
        value: "status"
      }
    ],
    items: [
      {
        uid: "Dakota Rice",
        username: "Niger",
        authority: "Oud-Tunrhout",
        email: "$35,738",
        status: "root"
      }
    ]
  }),

  created: function() {
    this.$api.admin
      .getUserList({
        pageNo: 1,
        pageSize: 10,
        type: 0
      })
      .then(res => {
        this.items = res.data.userList;
      })
      .catch(err => {});
  },

  methods: {
    save(uid, status) {
      console.log(uid, status);
      var json = '{"' + uid + '"' + ':"' + status + '"}'
      console.log(json)
      this.$api.admin.manageStatus(json)
    }
  }
};
</script>
