<template>
  <div class="container ">
    <h3 align="center">Delete or Remove Data From Mysql using Vue.js with PHP</h3>
    <br/>
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="row">
          <div class="d-grid gap-2 d-md-flex justify-content-md-center">
            <h4 class="panel-title">Sample Data</h4>
          </div>
          <div class="d-flex justify-content-around">
            <vButton @click="exportToPDF"
                     title="PDF Export"
                     class="btn-outline-secondary"
                     prependIcon="downloading"
            />
            <vButton @click="openModel"
                     title="Add"
                     class="btn-success"
                     prependIcon="add"
            />
          </div>
        </div>
      </div>
      <div class="panel-body" ref="document">
        <div class="table-responsive">
          <table class="table table-hover ">
            <thead>
            <tr>
              <th v-for="(v, name) in allData['0']"
                  :key="name"> {{ name }}
              </th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="row in allData" :key="row">
              <td v-for="i in row" :key="i" class="bordered">{{ i }}</td>
              <td>
                <vButton @click="fetchData(row.id)"
                         title="Edit"
                         class="btn-outline-primary edit"
                         prependIcon="edit"
                />
              </td>
              <td>
                <vButton @click="deleteData(row.id)"
                         title="Delete"
                         class="btn-outline-danger delete"
                         prependIcon="delete"
                />
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-if="myModel">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">{{ dynamicTitle }}</h4>
                  <vButton @click="myModel=false"
                           class="btn-close"/>
                </div>
                <div class="modal-body">
                  <div class="form-group mb-3">
                    <label>First Name</label>
                      <input type="text" class="form-control" placeholder="..." v-model="first_name"/>
                  </div>
                  <div class="form-group mb-3">
                    <label>Last Name</label>
                      <input type="text" class="form-control" placeholder="..." v-model="last_name"/>
                  </div>
                  <br/>
                  <div align="center">
                    <input type="hidden" v-model="hiddenId"/>
                    <input type="button" class="btn btn-success btn-xs" v-model="actionButton" @click="submitData"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import html2pdf from 'html2pdf.js'
import vButton from '@/components/v-button'

export default {
  name: 'Table',
  components: {
    vButton
  },
  data: () => ({
    allData: '',
    titles: '',
    myModel: false,
    actionButton: 'Insert',
    dynamicTitle: 'Add Data',
  }),
  methods: {
    fetchAllData() {
      // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      axios.post('./api/api.php', {
        action: 'fetchAll'
      }).then(response => {
        console.log(response.data);
        this.allData = response.data;
      });

    },
    openModel() {
      this.first_name = '';
      this.last_name = '';
      this.actionButton = "Insert";
      this.dynamicTitle = "Add Data";
      this.myModel = true;
    },
    submitData() {
      if (this.first_name !== '' && this.last_name !== '') {
        if (this.actionButton === 'Insert') {
          axios.post('./api/api.php', {
            action: 'insert',
            firstName: this.first_name,
            lastName: this.last_name
          }).then(response => {
            this.myModel = false;
            this.fetchAllData();
            this.first_name = '';
            this.last_name = '';
            alert(response.data.message);
          })
        }
        if (this.actionButton === 'Update') {
          axios.post('./api/api.php', {
            action: 'update',
            firstName: this.first_name,
            lastName: this.last_name,
            hiddenId: this.hiddenId
          }).then(response => {
            this.myModel = false;
            this.fetchAllData();
            this.first_name = '';
            this.last_name = '';
            this.hiddenId = '';
            alert(response.data.message);
          });
        }
      } else {
        alert("Fill All Field");
      }
    },
    fetchData(id) {
      axios.post('./api/api.php', {
        action: 'fetchSingle',
        id: id
      }).then(response => {
        this.first_name = response.data.first_name;
        this.last_name = response.data.last_name;
        this.hiddenId = response.data.id;
        this.myModel = true;
        this.actionButton = 'Update';
        this.dynamicTitle = 'Edit Data';
      });
    },
    deleteData(id) {
      if (confirm("Are you sure you want to remove this data?")) {
        axios.post('./api/api.php', {
          action: 'delete',
          id: id
        }).then(response => {
          this.fetchAllData();
          alert(response.data.message);
        });
      }
    },
    exportToPDF() {
      html2pdf(this.$refs.document, {
        margin: 1,
        filename: 'document.pdf',
        image: {type: 'jpeg', quality: 1},
        html2canvas: {dpi: 300, letterRendering: true},
        jsPDF: {unit: 'in', format: 'a4', orientation: 'portrait'},
        pagebreak: {mode: ['avoid-all', 'css', 'legacy']}
      })
    },
  },
  created: function () {
    this.fetchAllData();
  }
};

</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.table {
  text-align: center;

  .btn {
    margin: 0 auto
  }

}

</style>
