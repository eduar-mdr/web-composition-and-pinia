<template>
    <v-container>
        
        <v-sheet class="bg-grey-lighten-1 pa-12" rounded>
            <v-card class="mx-auto px-6 py-8" max-width="344">
                <h1 class="text-grey-darken-1">Iniciar sesión</h1>

            <v-form
                v-model="form"
                @submit.prevent="onSubmit"
            >
                <v-text-field
                v-model="email"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                label="Correo"
                placeholder="correo@empresa.com"
                clearable
                variant="underlined"
                ></v-text-field>

                <v-text-field
                v-model="password"
                :readonly="loading"
                :rules="[required]"
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                clearable
                type="password"
                variant="underlined"
                ></v-text-field>

                <br>

                <v-btn
                :disabled="!form"
                :loading="loading"
                color="teal-accent-4"
                size="large"
                type="submit"
                variant="elevated"
                block
                >
                Entrar
                </v-btn>
            </v-form>
            </v-card>
        </v-sheet>

    </v-container>
  </template>
  
  <script>
  export default {
    name: 'LoginView',
    data: () => ({
      form: false,
      email: null,
      password: null,
      loading: false,
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