<script setup lang="ts">
import type { LoginResponse } from '@/@fake-db/types'
import { VNodeRenderer } from '@/@layouts/components/VNodeRenderer'
import { useAppAbility } from '@/plugins/casl/useAppAbility'
import axios from '@axios'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'
import { themeConfig } from '@themeConfig'
import { emailValidator, requiredValidator } from '@validators'
import { VForm } from 'vuetify/components/VForm'

const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

const isPasswordVisible = ref(false)

const route = useRoute()
const router = useRouter()

const ability = useAppAbility()

const errors = ref<Record<string, string | undefined>>({
  email: undefined,
  password: undefined,
})

const refVForm = ref<VForm>()
const email = ref('admin@demo.com')
const password = ref('admin')
const rememberMe = ref(false)

const login = () => {
  axios.post<LoginResponse>('/auth/login', { email: email.value, password: password.value })
    .then(r => {
      const { accessToken, userData, userAbilities } = r.data

      localStorage.setItem('userAbilities', JSON.stringify(userAbilities))
      ability.update(userAbilities)

      localStorage.setItem('userData', JSON.stringify(userData))
      localStorage.setItem('accessToken', JSON.stringify(accessToken))

      // Redirect to `to` query if exist or redirect to index route
      router.replace(route.query.to ? String(route.query.to) : '/')
    })
    .catch(e => {
      const { errors: formErrors } = e.response.data

      errors.value = formErrors
      console.error(e.response.data)
    })
}

const onSubmit = () => {
  refVForm.value?.validate()
    .then(({ valid: isValid }) => {
      if (isValid)
        login()
    })
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4 bg-secondary">
    <div class="position-relative my-sm-16">
      <VCard
        flat
        width="750"
        height="475"
        class="d-flex flex-column mt-12 mt-sm-0 "

      >
          <VRow>
            <VCol cols="5" class="pa-0 ma-0">
                <VImg
                  cover
                  width="400"
                  height="600"
                  :src="authV2LoginIllustrationLight"
                  class="auth-illustration align-start bg-error"
                />
            </VCol>
            <VCol cols="7" class="pl-0 pr-4">
              <VCardText class="pb-2">
                <VNodeRenderer
                  
                  :nodes="themeConfig.app.logo"
                  class="my-9 text-center"
                />
                

                <p 
                class="text-grey-900 font-weight-black text-h4"
                
                >
                  登錄
                </p>
              </VCardText>
              <VCardText>
                <VForm
                  ref="refVForm"
                  @submit.prevent="onSubmit"
                >
                  <VRow>
                    <!-- email -->
                    <VCol cols="12" class="pb-0">
                      <AppTextField
                        v-model="email"
                        label="帳戶號碼"
                        type="email"
                        autofocus
                        prepend-inner-icon="tabler-mail"
                        :rules="[requiredValidator, emailValidator]"
                        :error-messages="errors.email"
                      />
                    </VCol>

                    <!-- password -->
                    <VCol cols="12" >
                      <AppTextField
                        v-model="password"
                        label="密碼"
                        :rules="[requiredValidator]"
                        :type="isPasswordVisible ? 'text' : 'password'"
                        :error-messages="errors.password"
                        prepend-inner-icon="tabler-lock"
                        isPasswordVisible="false"

                        class="mb-4"
                      />

                      <RouterLink
                        class="text-primary"
                        :to=  "{name: 'register'}"
                        style="font-size:small"
                      >
                        註冊
                      </RouterLink>
                      <VRow class="">
                        <VCol cols="6">
                          <VBtn
                            block
                            color="primary"
                            class="mt-4 text-white "
                            type="submit"
                            style="font-size:small"
                          >
                          登錄
                          </VBtn>
                        </VCol>
                        <VCol cols="6">
                          <VBtn
                            block
                            class="mt-4 bg-grey-100 border"
                            style="font-size:small"
                          >
                            取消
                          </VBtn>
                        </VCol>
                      </VRow>
                    </VCol>

                    <!-- create account -->
                    <!-- <VCol
                      cols="12"
                      class="text-center"
                    >
                      <span>New on our platform?</span>
                      <RouterLink
                        class="text-primary ms-2"
                        :to="{ name: 'register' }"
                      >
                        Create an account
                      </RouterLink>
                    </VCol> -->

                    <!-- auth providers -->
                    <!-- <VCol
                      cols="12"
                      class="text-center"
                    >
                      <AuthProvider />
                    </VCol> -->
                  </VRow>
                </VForm>
              </VCardText>
            </VCol>
          </VRow>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
.v-text-field--filled > .v-input__control > .v-input__slot {
    background: #ffffff !important;
    border: 1px solid rgba(0, 0, 0, 0.38) !important;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    transition: 0.2s;

    &:focus, &:active {
        border: 1px solid blue !important;
    }
    &:before, &:after {
        display: none;
    }
}
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
