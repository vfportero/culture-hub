<template>
  <ion-page>
    <ion-header >
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/app/timeline"></ion-back-button>
        </ion-buttons>
        <ion-title>Añadir nuevo registro</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
        <form novalidate>
          <ion-list lines="full" class="ion-no-margin">
            <ion-item button @click="selectType" class="type-item">
              <ion-label position="floating">Tipo</ion-label>
              <ion-input :value="selectedTypeDefinition?.name"></ion-input>
              <ion-icon v-if="selectedTypeDefinition" slot="end" :name="selectedTypeDefinition.icon"></ion-icon>
            </ion-item>
            <ion-item >
              <ion-label position="floating">Fecha</ion-label>
              <ion-input v-model="date" type="date"></ion-input>
            </ion-item>
            <ion-item >
              <ion-label position="floating">Nombre</ion-label>
              <ion-input v-model="name"></ion-input>
            </ion-item>
            <ion-item >
              <ion-label position="floating">Plataforma</ion-label>
              <ion-select v-if="selectedTypeDefinition" v-model="platform">
                <template v-for="group in selectedTypeDefinition.platforms" :key="group.name">
                  <ion-select-option :value="platform.id" v-for="platform in group.platforms" :key="platform.id">{{platform.name}}</ion-select-option>
                </template>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Valoración</ion-label>
              <ion-range v-model="rating" min="0.5" max="5" :step="0.5" snaps pin :pinFormatter="ratingPinFormatter">
                <ion-icon size="small" slot="start" name="star"></ion-icon>
                <ion-icon slot="end" name="star"></ion-icon>
              </ion-range>
            </ion-item>
            <ion-item >
              <ion-label position="floating">Crítica</ion-label>
              <ion-textarea v-model="review" auto-grow></ion-textarea>
            </ion-item>
            <ion-item >
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
              <ion-label position="stacked">Preview</ion-label>
              <ion-thumbnail v-for="file in images" :key="file">
                <img :src="file.blob" />
              </ion-thumbnail>
            </ion-item>
          </ion-list>
          
        </form>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-button @click="save()" full>Añadir</ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { LogEntryType, LogEntryTypeDefinition } from '@/models';
import UserLogEntriesStore from '@/store/modules/userLogEntries';

import {
    IonContent,
    IonPage,
    IonBackButton,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
    pickerController,
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
    IonFooter
} from '@ionic/vue';
import { computed, defineComponent, PropType, ref } from 'vue';
export default defineComponent({
    name: 'NewLogEntry',
    props: {
      type: {
        type: Object as PropType<LogEntryType>
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
      IonFooter
    },
    setup(props) {
      const types = computed(() => Object.keys(LogEntryType).map(key => new LogEntryTypeDefinition(LogEntryType[key])));
      const typesOptions = {
        name: 'Type',
        options: types.value.map(t => ({
          text: t.name,
          value: t.type
        }))
      };
      const selectedType = ref(props.type);
      const selectedTypeDefinition = computed(() => selectedType.value ? types.value.find(t => t.type === selectedType.value) : null);
      const selectType = async () => {
        const picker = await pickerController.create({
          columns: [typesOptions],
          buttons: [
            {
              text: "Cancelar",
              role: "cancel",
            },
            {
              text: "Seleccionar",
              handler: (value) => {
                selectedType.value = value['Type'].value;
              },
            },
          ],
        });
        await picker.present();
      };
      

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

      const save = async () => {
        await UserLogEntriesStore.createNewUserLogEntry({
          date: new Date(date.value),
          type: selectedType.value,
          name: name.value,
          platform: platform.value,
          rating: rating.value,
          review: review.value,
          images: [...images.value.map(image => image.file)],
          externalId: null,
        });

      // if (result === true) {
      //   this.clearForm();
      //   this.$router.push('/home');
      // } else {
      //   this.logEntryError = result.toString();
      // }
        
  }

      return { types, selectedType, selectedTypeDefinition, date, maxDate, selectType, name, platform, review, rating, ratingPinFormatter, images, save, inputFilter };
    },
});
</script>

<style lang="css" scoped>
  .type-item {
    align-items: center;
  }
</style>