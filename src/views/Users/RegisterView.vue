<template>
    <v-container>
      
    <v-sheet class="bg-grey-lighten-1 pa-12" rounded>
      <v-card
          class="mx-auto px-6 py-8"
          max-width="344"
      >
      
          <v-form
                v-model="form"
                @submit.prevent="onSubmit"
            >
              <h1 class="text-grey-darken-1">Registrar usuario</h1>
              <v-text-field
                  v-model="first"
                  color="primary"
                  label="Nombre"
                  variant="underlined"
              ></v-text-field>

              <v-text-field
                  v-model="last"
                  class="mb-2"
                  label="Apellido"
                  variant="underlined"
              ></v-text-field>

              <v-text-field
                  v-model="email"
                  class="mb-2"
                  label="Correo"
                  variant="underlined"
              ></v-text-field>

              <v-text-field
                  v-model="password"
                  class="mb-2"
                  label="Contraseña"
                  placeholder="Enter your password"
                  variant="underlined"
                  type="password"
              ></v-text-field>

              <v-checkbox
                  v-model="terms"
                  class="mb-2"
                  label="Acepto los términos y condiciones"
              ></v-checkbox>
          

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="teal-accent-4">
                    Registrarse
                    <v-icon icon="mdi-chevron-right" end></v-icon>
                </v-btn>
              </v-card-actions>
        </v-form>
      </v-card>
    </v-sheet>

    </v-container>
  </template>
  
  <script>
  export default {
    name: 'RegisterView',
    data: () => ({
      form: false,
      loading: false,
      first: null,
      last: null,
      email: null,
      password: null,
      terms: false,
    }),

    methods: {
      onSubmit () {
        if (!this.form) return

        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
      required (v) {
        return !!v || 'Field is required'
      },
    },
  }
  </script>