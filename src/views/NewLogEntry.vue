<template>
  <ion-page>
    <ion-header >
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/app/timeline"></ion-back-button>
        </ion-buttons>
        <ion-title>Añadir nuevo registro</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-row>
        <ion-col size-md="6" offset-md="3" size-lg="4" offset-lg="4">
        <form novalidate>
          <ion-list lines="full" class="ion-no-margin">
            <ion-item button class="input-item">
              <ion-label position="floating">Tipo</ion-label>
              <ion-select v-model="selectedType" interface="action-sheet" cancel-text="Cancelar" :class="{'hide-caret': selectedTypeDefinition}">
                <template v-for="t in types" :key="t.type">
                  <ion-select-option :value="t.type">
                    {{t.name}}
                  </ion-select-option>
                </template>
              </ion-select>
              <ion-icon slot="end" v-if="selectedTypeDefinition" :name="selectedTypeDefinition.icon" ></ion-icon>
            </ion-item>
            <ion-item class="input-item">
              <ion-label position="floating">Fecha</ion-label>
              <ion-input v-model="date" type="date"></ion-input>
            </ion-item>
            <ion-item class="input-item">
              <ion-label position="floating">Nombre</ion-label>
              <ion-input v-model="name"></ion-input>
              <ion-icon slot="end" name="bookmark" ></ion-icon>
            </ion-item>
            <ion-item class="input-item">
              <ion-label position="floating">Plataforma</ion-label>
              <ion-select v-model="platform" interface="action-sheet" cancel-text="Cancelar">
                <template v-for="group in selectedTypeDefinition?.platforms" :key="group.name">
                  <ion-select-option :value="platform.id" v-for="platform in group.platforms" :key="platform.id">{{platform.name}}</ion-select-option>
                </template>
              </ion-select>
            </ion-item>
            <ion-item class="input-item">
              <ion-label position="floating">Valoración</ion-label>
              <ion-range v-model="rating" min="0.5" max="5" :step="0.5" snaps pin :pinFormatter="ratingPinFormatter">
                <ion-icon size="small" slot="start" name="star"></ion-icon>
                <ion-icon slot="end" name="star"></ion-icon>
              </ion-range>
            </ion-item>
            <ion-item >
              <ion-label position="floating">Crítica <template v-if="review">{{review.length}}</template></ion-label>
              <ion-textarea v-model="review" auto-grow spellcheck></ion-textarea>
              <ion-icon slot="end" name="heart"></ion-icon>
            </ion-item>
            <ion-item class="input-item">
              <file-upload
                  accept="image/*"
                  multiple
                  v-model="images" 
                  @input-filter="inputFilter"
                  :maximum="4"
                >
                <ion-button color="light">Subir imágenes</ion-button>
              </file-upload>
              <ion-icon slot="end" name="cloud-upload"></ion-icon>
            </ion-item>
            <ion-item >
              <ion-thumbnail v-for="file in images" :key="file">
                <img :src="file.blob" />
              </ion-thumbnail>
            </ion-item>
          </ion-list>
          
        </form>
        </ion-col>
      </ion-row>
    </ion-content>
    <ion-footer>
      <ion-row>
        <ion-col no-padding>
            <ion-button :disabled="loading" expand="full" color="light" @click="back">Cancelar</ion-button>
        </ion-col>
        <ion-col no-padding>
            <ion-button :disabled="loading" expand="full" color="primary" @click="save">
              Añadir <ion-spinner v-if="loading"></ion-spinner>
            </ion-button>
        </ion-col>
      </ion-row>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { LogEntryType, LogEntryTypeDefinition, UserLogEntriesLoadingStatus } from '@/models';
import UserLogEntriesStore from '@/store/modules/userLogEntries';

import {
    IonContent,
    IonPage,
    IonBackButton,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonItem,
    IonList,
    IonLabel,
    IonIcon,
    IonInput,
    IonRange,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonButton,
    IonFooter,
    IonThumbnail,
    IonCol,
    IonRow,
    IonSpinner
} from '@ionic/vue';
import { computed, defineComponent, PropType, ref } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'NewLogEntry',
    props: {
      type: {
        type: Object as PropType<LogEntryType>,
        required: false,
      }
    },
    components: {
      IonContent,
      IonPage,
      IonBackButton,
      IonHeader, 
      IonToolbar,
      IonButtons,
      IonTitle,
      IonItem,
      IonList,
      IonLabel,
      IonIcon,
      IonInput,
      IonRange,
      IonSelect,
      IonSelectOption,
      IonTextarea,
      IonButton,
      IonFooter,
      IonThumbnail,
      IonCol,
      IonRow,
      IonSpinner
    },
    setup(props) {
      const router = useRouter();
      const loading = computed(() => UserLogEntriesStore.loadingStatus !== UserLogEntriesLoadingStatus.idle);
      const types = computed(() => Object.keys(LogEntryType).map(key => new LogEntryTypeDefinition(LogEntryType[key])));
      const selectedType = ref(props.type);
      const selectedTypeDefinition = computed(() => selectedType.value ? types.value.find(t => t.type === selectedType.value) : null);
      

      const formatDate = (date: Date) => {
        const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
        const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        return `${year}-${month}-${day}`;
      };

      const date = ref(formatDate(new Date()));
      const maxDate = date;

      const name = ref('');
      const platform = ref('');
      const review = ref('');
      const rating = ref();
      const images = ref([]);

      const ratingPinFormatter = (value: number) : number => value;
      const inputFilter = (newFile, oldFile, prevent) => {
      if (newFile && !oldFile) {
        // Add file

        // Filter non-image file
        // Will not be added to files
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
          return prevent()
        }

        // Create the 'blob' field for thumbnail preview
        newFile.blob = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file)
        }
      }

      if (newFile && oldFile) {
        // Update file

        // Increase the version number
        if (!newFile.version) {
          newFile.version = 0
        }
        newFile.version++
      }

      if (!newFile && oldFile) {
        // Remove file

        // Refused to remove the file
        // return prevent()
      }
      }

      const back = () => {
        router.back();
      }

      const clearForm = () => {
        name.value = '';
        platform.value = '';
        review.value = '';
        rating.value = 0;
        images.value = [];
        date.value = formatDate(new Date());
        selectedType.value = null;
      }

      const save = async () => {
        const result = await UserLogEntriesStore.createNewUserLogEntry({
          date: new Date(date.value),
          type: selectedType.value,
          name: name.value,
          platform: platform.value,
          rating: rating.value,
          review: review.value,
          images: [...images.value.map(image => image.file)],
          externalId: null,
        });

        if (result === true) {
          clearForm();
          router.push('/app/timeline');
        }
          
    }

      return { types, selectedType, selectedTypeDefinition, date, maxDate, name, platform, review, rating, ratingPinFormatter, images, save, inputFilter, back, loading };
    },
});
</script>

<style lang="css" scoped>
  .input-item {
    align-items: center;
  }

  ion-select.hide-caret::part(icon) {
    display: none;
  }
</style>