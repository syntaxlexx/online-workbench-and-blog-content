<template>
  <div>
    <button @click="selectScreen('inbox')" :disabled="selectedScreen == 'inbox'">Inbox</button>
    <button @click="selectScreen('archived')" :disabled="selectedScreen == 'archived'">
      Archived
    </button>
  </div>

  <BulkActionBar :emails="filteredEmails" />

  <table class="mail-table">
    <tbody>
      <tr
        v-for="email in filteredEmails"
        :key="email.id"
        :class="['clickable', email.read ? 'read' : '']"
      >
        <td>
          <input
            type="checkbox"
            @click="emailSelection.toggle(email)"
            :checked="emailSelection.emails.has(email)"
          />
        </td>
        <td @click="openEmail(email)">{{ email.from }}</td>
        <td @click="openEmail(email)">
          <strong>{{ email.subject }}</strong> - {{ email.body }}
        </td>
        <td class="date" @click="openEmail(email)">
          {{ format(new Date(email.sentAt), "MMM do, yyyy") }}
        </td>
        <td>
          <button @click="archiveEmail(email)">
            {{ email.archived ? "Un-Archive" : "Archive" }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <modal v-if="openedEmail" @closeModal="openedEmail = null">
    <mail-view :email="openedEmail" @changeEmail="changeEmail" />
  </modal>
</template>

<script>
import { format } from "date-fns";
import axios from "axios";
import MailView from "./MailView";
import Modal from "./Modal";
import { ref } from "vue";
import useEmailSelection from "../composables/use-email-selection";
import BulkActionBar from "@/components/BulkActionBar";

export default {
  components: {
    MailView,
    Modal,
    BulkActionBar
  },
  async setup() {
    let resp = await axios.get("http://localhost:3000/emails");
    let emails = resp.data;

    return {
      format,
      emails: ref(emails),
      openedEmail: ref(null),
      emailSelection: useEmailSelection(),
      selectedScreen: ref("inbox")
    };
  },
  computed: {
    sortedEmails() {
      return this.emails.sort((e1, e2) => {
        return e1.sentAt < e2.sentAt ? 1 : -1;
      });
    },
    filteredEmails() {
      if (this.selectedScreen == "inbox") return this.sortedEmails.filter(e => !e.archived);

      return this.sortedEmails.filter(e => e.archived);
    }
  },
  methods: {
    selectScreen(newScreen) {
      this.selectedScreen = newScreen;
      this.emailSelection.clear();
    },

    openEmail(email) {
      this.openedEmail = email;
      if (email) {
        email.read = true;
        this.updateEmail(email);
      }
    },
    archiveEmail(email) {
      email.archived = !email.archived;
      this.updateEmail(email);
    },
    updateEmail(email) {
      axios.put(`http://localhost:3000/emails/${email.id}`, email);
    },
    changeEmail({ toggleRead, toggleArchive, save, closeModal, changeIndex }) {
      let email = this.openedEmail;

      if (toggleRead) {
        email.read = !email.read;
      }
      if (toggleArchive) {
        email.archive = !email.archive;
      }

      if (save) {
        this.updateEmail(email);
      }

      if (closeModal) {
        this.openedEmail = null;
      }

      if (changeIndex) {
        let emails = this.filteredEmails;
        let currentIndex = emails.indexOf(this.openedEmail);
        let newEmail = emails[currentIndex + changeIndex];
        this.openEmail(newEmail);
      }
    }
  }
};
</script>

<style></style>
