<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore.js'
import { storeToRefs } from 'pinia';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonButton,
    IonLabel,
    IonItem,
    IonList,
    IonImg
} from '@ionic/vue'

const route = useRoute()
const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)
const task = computed(() =>
    tasks.value.find(t => t.id === Number(route.params.id))
)
const { addPhotoToTask } = taskStore
const pickMedia = async () => {
  try {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      quality: 90
    })
    addPhotoToTask(task.value.id, photo.dataUrl)
  } catch (e) {
    console.log('Photo cancelled or failed', e)
  }
}
</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/tabs/tab1"></ion-back-button>
                </ion-buttons>
                <ion-title>Task Detail</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div v-if="task">
                <ion-list>
                    <ion-item>
                        <ion-label>
                            <h2>{{ task.name }}</h2>
                        </ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label>
                            Status: {{ task.done ? 'Done ✅' : 'Pending ⏳' }}
                        </ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label>
                            ID: {{ route.params.id }}
                        </ion-label>
                    </ion-item>
                    <ion-button expand="block" @click="pickMedia">📷 Add Photo</ion-button>
                    <ion-img
                        v-if="task.photo"
                        :src="task.photo"
                        style="width: 100%; margin-top: 16px; border-radius: 8px;"
                    />
                </ion-list>
            </div>
            <div v-else>
                <ion-label>Task not found!</ion-label>
            </div>
        </ion-content>
    </ion-page>
</template>