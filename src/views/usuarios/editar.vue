<template>
  <div class="app-container">
 <el-form
      status-icon
      :rules="rules"
      ref="form"
      :model="form"
      label-width="120px"
      size="mini"
      label-position="top"
    >
      <el-row :gutter="20">
              <el-col :span="3">
          <el-form-item label="id">
            <el-input disabled v-model="form.id" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Email">
            <el-input v-model="form.email" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="Nome">
            <el-input v-model="form.first_name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Sobrenome">
            <el-input v-model="form.last_name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="Fone">
            <el-input v-model="form.fone" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Modulos">
            <el-select v-model="form.modulos" multiple placeholder="Select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row>
        <el-col :span="8">
          <el-form-item label="Usuario Admin">
            <el-switch v-model="form.admin" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Empresa">
            <el-select
              v-model="form.idempresa"
              filterable
              allow-create
              default-first-option
              @change="selecionarFilial"
              placeholder="Escolha a Empresa"
            >
              <el-option
                v-for="item in empresasNovo"
                :key="item.id"
                :label="item.nomeempresa"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Filial">
            <el-select
              v-model="form.idfilial"
              filterable
              allow-create
              default-first-option
              placeholder="Escolha a Filial"
            >
              <el-option
                v-for="item in filialFiltrado"
                :key="item.id"
                :label="item.nomefilial"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Foto de Perfil">
            <input
              type="file"
              id="file"
              ref="file"
              v-on:change="handleFileUpload()"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12"> </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { empresaList,  } from "../../api/empresas";
import { filiaisList, } from "../../api/filiais";
import { detalheusuarioid } from "../../api/user";



export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.form.password1 !== "") {
          this.$refs.form.validateField("password1");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.form.password) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
     return {
      form: {
        id: "",
        fone: "",
        email: "",
        first_name: "",
        last_name: "",
        ativo: true,
        password: "",
        admin: null,
        idempresa: "",
        idfilial: "",
        modulos: [],
      },
      empresasNovo: null,
      filiaisNovo: null,
      filialFiltrado: null,
      filtroSelect: "",
      options: [
        {
          value: 1,
          label: "Administracao",
        },
        {
          value: 2,
          label: "Dashboard",
        },
        {
          value: 3,
          label: "Custos",
        },
      ],
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        password1: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  created() {
    
    empresaList().then((response) => {
      this.empresasNovo = response.results;
    });
    filiaisList().then((response) => {
      this.filiaisNovo = response.results;
    });
    detalheusuarioid(this.$route.query.id).then((response) => {
      this.form = response
      this.form.password = "nada"

    });
  },
  methods: {
        handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    selecionarFilial(data) {
      console.log('passou aki')
      this.form.idfilial = null
      this.filialFiltrado = this.filiaisNovo.filter((filial) => {
        return filial.idempresa == data;
      });

    },
    onSubmit() {
      
      this.form.criadopor = this.$store.getters.user.id;
      // Colocar o indicador pq precisac
      usuarioEditar(this.form).then((response) => {
        this.$message("Filial alterada conforme solicitado!");
        this.$router.push("/administracao/filiais/");
      });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    onCancel() {
      this.$router.push("/administracao/empresas/");
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

