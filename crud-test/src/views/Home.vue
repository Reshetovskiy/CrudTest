<template>
  <div class="home">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="listPosts"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>My CRUD</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical>

            </v-divider>
            <v-spacer></v-spacer>
            <v-dialog
              v-model="dialog"
              max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on">New Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          :rules="validation.required"
                          v-model="editedItem.name"
                          label="Name user"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4">
                        <v-text-field
                          :rules="validation.emailRules"
                          v-model="editedItem.email"
                          label="Email"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4">
                        <v-text-field
                          :rules="validation.required"
                          v-model="editedItem.phone"
                          label="Phone"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4">
                        <v-text-field
                          :rules="validation.required"
                          v-model="editedItem.website"
                          label="website"
                        ></v-text-field>
                      </v-col>

                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>

      </v-data-table>
    </v-app>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'Home',
  data: () => ({
    dialog: false,
    validation: {
      required: [
        v => !!v || 'Field is required',
        v => (v && v.length >= 2) || 'Name must be longer than 2 characters',
      ],
      phone: [
        v => !!v || 'Field is required',
        v => (v && v.length >= 6) || 'Phone must be longer than 10 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    },
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Email', value: 'email' },
      { text: 'Phone', value: 'phone' },
      { text: 'Website', value: 'website' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
      email: '',
      phone: '',
      website: ''
    },
    defaultItem: {
      name: '',
      email: '',
      phone: '',
      website: ''
    },
  }),
  computed: {
    ...mapState(["listPosts"]),
    formTitle () {
      return this.editedIndex === -1 ? 'New User' : 'Edit User'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
  },
  mounted() {
    this.getListPost();
  },
  methods: {
    ...mapActions([
      'getListPost',
      'handleDeleteUser',
      'handleEditUser',
      'handleNewUser'
    ]),

    editItem (item) {
      this.editedIndex = this.listPosts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const user = this.listPosts.find(item => item.id)
      confirm('Are you sure you want to delete this item?') && this.handleDeleteUser(user.id, 1)
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        this.handleEditUser(this.editedItem);
      } else {
        this.handleNewUser(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
