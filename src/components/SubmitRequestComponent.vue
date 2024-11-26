<template>
  <div class="submit-request-container">
    <h1 class="new-request-title">Submit a new request</h1>
    <form class="new-request-form" @submit.prevent="submit">
      <!-- Upload Fitting Reference -->
      <div class="form-group">
        <label for="fitting-upload">*Upload the fitting we can refer to (Product link)</label>
        <input
          type="url"
          id="fitting-upload"
          placeholder="Enter product link"
          required
          v-model.trim="fittingRefer"
        />
      </div>

      <!-- Size Breakdown -->
      <div class="form-group">
        <label for="size-breakdown">*Size Breakdown (e.g., S:20; M:30; L:30; XL:20)</label>
        <input
          type="text"
          id="size-breakdown"
          placeholder="Enter size breakdown"
          required
          v-model.trim="sizeBreakDown"
        />
      </div>

      <!-- Fabric Preference (Optional) -->
      <div class="form-group">
        <label for="fabric-preference">Fabric Preference (optional)</label>
        <input
          type="text"
          id="fabric-preference"
          placeholder="Enter fabric preference"
          v-model.trim="fabricPreference"
        />
      </div>

      <!-- Pantone Color (Optional) -->
      <div class="form-group">
        <label for="pantone-color">Pantone Color (optional, e.g., PANTONE 15-1822 TPG)</label>
        <input
          type="text"
          id="pantone-color"
          placeholder="Enter Pantone color"
          v-model.trim="pantoneColor"
        />
      </div>

      <!-- Target Cost Price (Optional) -->
      <div class="form-group">
        <label for="target-cost-price">Target Cost Price (optional)</label>
        <input
          type="number"
          id="target-cost-price"
          placeholder="Enter target cost price"
          v-model.number="targetCostPrice"
        />
      </div>
      <!-- Upload Design/Pattern -->

      <div class="design-upload">
        <label for="design-upload">*Upload your design/pattern (PDF/JPG)</label>
        <input
          type="file"
          id="design-upload"
          accept=".pdf, .jpg, .jpeg, .png"
          @change="uploadFile"
        />
      </div>
      <!-- Submit Button -->
      <div class="form-group">
        <p v-if="isUploading">Uploading...</p>
        <button v-else type="submit" class="submit-button" :disabled="isUploading">Submit</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import router from '@/router/index.js'
import { PATHS } from '@/constants/paths.js'
import { supabase } from '@/utils/supabase.js'
import { v4 as uuidv4 } from 'uuid'
import { userSessionStore } from '@/stores/userSessionStore.js'

const fittingRefer = ref(
  'https://www.jetbrains.com/help/webstorm/vue-js.html#vue_debug_via_js_debug_rc',
)
const sizeBreakDown = ref('S:20; M:30; L:30; XL:20')
const fabricPreference = ref('')
const pantoneColor = ref('')
const targetCostPrice = ref('')
const designPath = ref('')
const isUploading = ref(false)
const designFile = ref(null)
const uploadFile = (event) => {
  designFile.value = event.target.files[0]
}
const fileName = computed(() => designFile.value?.name)
const fileExtension = computed(() => fileName.value.split('.').pop())
const fileMimeType = computed(() => designFile.value?.type)

const userSession = userSessionStore()

const submit = async () => {
  try {
    isUploading.value = true
    console.log(fileExtension.value)
    console.log(designPath.value)
    console.log(fileMimeType.value)
    if (!designFile.value) {
      console.warn('null designFile')
      return
    }
    const userUuid = userSession.user.id
    const fileUuid = uuidv4()

    const { data, error } = await supabase.storage
      .from('design')
      .upload(`${userUuid}/${fileUuid}.${fileExtension.value}`, designFile.value, {
        contentType: fileMimeType.value,
        cacheControl: '3600',
        upsert: false,
      })
    if (!error) {
      console.log('Upload successful:', data)
      await router.push(PATHS.DASHBOARD)
    } else {
      console.error(error)
    }

  } catch (error) {
    console.error(error)
  } finally {
    isUploading.value = false
  }
}
</script>

<style scoped>
.submit-request-container {
  flex: 1;
  padding: 20px;
  font-family: var(--font-primary); /* Use primary font */
}

.new-request-title {
  text-align: center;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
}

.new-request-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
}

.design-upload {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

label {
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

input[type='text'],
input[type='url'],
input[type='file'] {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

input[type='text']:focus,
input[type='url']:focus,
input[type='file']:focus {
  border-color: #009688; /* Accent color */
  outline: none;
}

.processing-bar {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f0f0f0;
  color: #555;
  font-style: italic;
}

.submit-button {
  background-color: #00564d; /* Dark Green for button */
  color: #ffffff; /* White text */
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #00796b; /* Slightly lighter green on hover */
}
</style>
