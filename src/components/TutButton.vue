<script>
export default {
  data () {
    return {
      lastId: 0,
      feeds: [],
      feed_url: ''
    }
  },
  methods: {
    handle_submit () {
      const feedObj = { id: this.lastId++, url: this.feed_url }
      console.log(this.feeds)
      this.feeds.push(feedObj)
      this.addFeedsToDb(feedObj).then(() => { console.log('added') })
      this.getFeedsFromDb().then((e) => { this.feeds = e })
      this.feed_url = ''
    },
    async handle_dir_button () {
      const handle = await window.showDirectoryPicker()
      console.log(handle)
      const writeable = await handle.getFileHandle('dummy.txt', { create: true }).then((a) => { return a.createWritable() })
      console.log(writeable)
      await writeable.write(JSON.stringify(this.feeds))
      writeable.close()
    },
    async getDb () {
      return new Promise((resolve, reject) => {
        const request = window.indexedDB.open('feed_db', 1)
        request.onerror = e => {
          console.log('Error opening database', e)
          reject(Error('error'))
        }

        request.onsuccess = e => {
          resolve(e.target.result)
        }

        request.onupgradeneeded = e => {
          console.log('upgrade needed')
          const db = e.target.result
          // eslint-disable-next-line no-unused-vars
          const feedStore = db.createObjectStore('feeds', { autoincrement: true, keyPath: 'id' })
          const idStore = db.createObjectStore('lastID')
          // eslint-disable-next-line no-unused-vars
          const req = idStore.add(0, 0)
        }
      })
    },
    async getFeedsFromDb () {
      return new Promise((resolve) => {
        const trans = this.db.transaction('feeds', 'readonly')

        trans.oncomplete = () => {
          console.log(listOfFeeds)
          resolve(listOfFeeds)
        }

        const store = trans.objectStore('feeds')
        // eslint-disable-next-line prefer-const
        let listOfFeeds = []

        store.openCursor().onsuccess = e => {
          const cursor = e.target.result
          if (cursor) {
            listOfFeeds.push(cursor.value)
            cursor.continue()
          }
        }
      })
    },
    async addFeedsToDb (feedobj) {
      return new Promise((resolve) => {
        const trans = this.db.transaction('feeds', 'readwrite')

        trans.oncomplete = () => {
          const transId = this.db.transaction('lastID', 'readwrite')

          transId.oncomplete = () => { resolve() }

          const store = transId.objectStore('lastID')
          const req = store.put(this.lastId, 0)
          req.onerror = (e) => {
            console.log('Fatal error. cant update lastID')
          }
        }

        const store = trans.objectStore('feeds')
        console.log(feedobj)
        const request = store.add(feedobj)
        request.onsuccess = (e) => {
          console.log('success', e)
        }

        request.onerror = (e) => {
          console.log('failure', e)
        }
      })
    },
    async getLastID () {
      return new Promise((resolve, reject) => {
        const trans = this.db.transaction('lastID', 'readonly')
        let lastID = 0

        trans.oncomplete = () => {
          resolve(lastID)
        }

        const store = trans.objectStore('lastID')

        store.openCursor(0).onsuccess = e => {
          const cursor = e.target.result
          if (cursor) {
            lastID = cursor.value
            console.log('ID present in the db ', lastID)
          } else {
            console.log('Cursor empty')
          }
        }
      })
    }
  },
  async created () {
    this.db = await this.getDb()
    this.lastId = await this.getLastID()
    this.feeds = await this.getFeedsFromDb()
    this.ready = true
    const navigator = window.navigator
    const estimate = await navigator.storage.estimate()
    console.log(estimate)
  }
}
</script>

<template>
  <button @click="handle_dir_button">Open a directory</button>
  <form @submit.prevent="handle_submit">
    <input type="text" v-model="feed_url">
    <button> Add Feed </button>
</form>
    <li v-for="feed in feeds" v-bind:key="feed.id" >
        {{ feed.url }}
    </li>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
