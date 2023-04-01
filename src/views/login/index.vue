<template>
    <div class="login-wapper flex items-center justify-center">
        <div class="login-form">
            <div>
                <n-image>

                </n-image>
                <h1>欢迎使用AI助手</h1>
            </div>
            <section v-if="isRegister">
                <n-form ref="refRegisterForm" :model="registerForm" :rules="rules" size="large">
                    <n-form-item path="phoneNumber">
                        <n-input-number v-model:value="registerForm.phoneNumber" style="width: 100%;" autofocus
                            :show-button="false" clearable :maxlenth="11" :minlength="11" placeholder="请输入手机号">
                            <template #prefix>
                                <SvgIcon class="text-xl" icon="ic:outline-phone-iphone"></SvgIcon>
                            </template>
                        </n-input-number>
                    </n-form-item>
                    <n-form-item path="password">
                        <n-input v-model:value="registerForm.password" clearable type="password"
                            show-password-on="mousedown" placeholder="请输入密码">
                            <template #prefix>
                                <SvgIcon class="text-xl" icon="mdi:password"></SvgIcon>

                            </template>
                        </n-input>
                    </n-form-item>
                    <n-form-item path="checkPassword">
                        <n-input v-model:value="registerForm.checkPassword" clearable type="password"
                            show-password-on="mousedown" placeholder="请输入密码">
                            <template #prefix>
                                <SvgIcon class="text-xl" icon="mdi:password"></SvgIcon>

                            </template>
                        </n-input>
                    </n-form-item>
                    <div class="flex items-center justify-center">
                        <n-button type="primary" @click="sumbitRegister" style="margin-right: 10px;">确定</n-button>
                        <n-button type="error" @click="closeReisterForm(0)">取消</n-button>
                    </div>
                </n-form>
            </section>
            <section v-else>
                <n-form ref="refLoginForm" :model="loginForm" :rules="rules" size="large">
                    <n-form-item path="phoneNumber">
                        <n-input-number v-model:value="loginForm.phoneNumber" style="width: 100%;" autofocus
                            :show-button="false" clearable :maxlenth="11" :minlength="11" placeholder="请输入手机号">
                            <template #prefix>
                                <SvgIcon class="text-xl" icon="ic:outline-phone-iphone"></SvgIcon>
                            </template>
                        </n-input-number>
                    </n-form-item>
                    <n-form-item path="password">
                        <n-input v-model:value="loginForm.password" clearable type="password" show-password-on="mousedown"
                            placeholder="请输入密码">
                            <template #prefix>
                                <SvgIcon class="text-xl" icon="mdi:password"></SvgIcon>

                            </template>
                        </n-input>
                    </n-form-item>
                    <!-- <div class="flex items-center justify-end">
                        <n-button quaternary type="primary" @click="isRegister = true">注册</n-button>
                    </div> -->
                    <n-form-item>
                        <n-button type="primary" style="width:100%" @click="handleSubmit">登录</n-button>
                    </n-form-item>
                </n-form>
            </section>
        </div>


    </div>
</template>
<script setup lang="ts">
import { NForm, NFormItem, NInput, NInputNumber, NButton, NImage, FormRules, FormItemRule, FormInst, useMessage } from 'naive-ui'
import { SvgIcon } from '@/components/common'
import { ref } from 'vue'
import { useAuthStoreWithout } from '@/store/modules/auth'

import { fecthReister } from '@/api'
import { useRouter } from 'vue-router'

import md5 from 'js-md5'
import { setToken } from '@/store/modules/auth/helper'
const router = useRouter()
const authStore = useAuthStoreWithout()
const msg = useMessage()
interface form {
    phoneNumber: string | null
    password: string | null
    checkPassword?: string | null
}
const refLoginForm = ref<FormInst | null>(null)
const refRegisterForm = ref<FormInst | null>(null)
const registerForm = ref<form>({
    phoneNumber: null,
    password: null,
    checkPassword: null
})
const defaultReisterForm = {
    phoneNumber: null,
    password: null,
    checkPasswrod: null
}
const loginForm = ref<form>({
    phoneNumber: null,
    password: null
})
const rules: FormRules = {
    phoneNumber: [

        {
            required: true,
            validator(rule: FormItemRule, value: string) {

                const reg = /^1[3-9]\d{9}$/
                if (!value) {
                    return new Error('请输入11位手机号')
                } else if (!reg.test(value)) {
                    return new Error('请输入11位手机号')
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    ],
    password: [

        {
            required: true,
            validator(rule: FormItemRule, value: string) {
                // const reg = /^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$/
                value = value.trim()
                if (!value) {

                    return new Error('请输入密码')
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    ],
    checkPassword: [

        {
            required: true,
            validator(rule: FormItemRule, value: string) {
                if (value !== registerForm.value.password) {
                    return new Error('两次密码输入不一致')
                }

                return true
            },
            trigger: ['input', 'blur']
        }
    ]

}

const isRegister = ref(false)

/**
 * 注册提交
 */
const sumbitRegister = async () => {
    msg.success('注册成功')
    refRegisterForm.value?.validate(err => {
        if (!err) {
            fecthReister(registerForm.value).then((res: any) => {
                console.log('注册', res);

            })
        }
    })
}
/**
 * 登录
 */
const handleSubmit = async () => {


    refLoginForm.value?.validate(err => {
        if (!err) {

            loginForm.value.password = md5(loginForm.value.password)
            try {
                authStore.getSession(loginForm.value).then((res: any) => {

                    if (res) {
                        msg.success('登录成功')
                        router.push({
                            path: '/'
                        })
                    } else {
                        msg.error('登录失败')
                        loginForm.value = {
                            phoneNumber: null,
                            password: null
                        }
                    }


                })

            }
            catch (error) {

            }
        }
    })
}
/**
 * 关闭注册
 * @param type 0/取消，1/确定
 */
const closeReisterForm = async (type: number) => {

    isRegister.value = false
    if (type === 0) {
        registerForm.value = defaultReisterForm
    }

}
</script>
<style lang="less" scoped>
.login-wapper {
    width: 100%;
    height: 100%;
    background: url(../../assets/back-img.jpeg) no-repeat;
    background-size: 100% 100%;

    .login-form {
        border-radius: 6px;
        background: #ffffff;
        width: 400px;
        box-shadow: 0px 1px 4px 2px #18a05779;
        padding: 20px;


    }

    // .login-form::before {
    //     content: "";
    //     width: 100%;
    //     height: 100%;
    //     position: absolute;
    //     left: 0;
    //     top: 0;
    //     background: inherit;
    //     filter: blur(2px);
    //     z-index: 2;
    // }
}
</style>