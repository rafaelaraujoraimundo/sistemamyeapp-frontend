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
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="Password" prop="password">
            <el-input
              type="password"
              autocomplete="off"
              v-model="form.password"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Repetir password" prop="password1">
            <el-input
              type="password"
              autocomplete="off"
              v-model="form.password1"
            />
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
import { empresaList } from "../../api/empresas";
import { filiaisList } from "../../api/filiais";
import { usuarioNovo } from "../../api/user";

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
        fone: "",
        email: "",
        first_name: "",
        last_name: "",
        ativo: true,
        password: "",
        password1: "",
        admin: false,
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
  },
  methods: {
    onSubmit() {
      let formData = new FormData();
      formData.append("first_name", this.form.first_name);
      formData.append("last_name", this.form.last_name);
      formData.append("perfil", this.file);
      formData.append("email", this.form.email);
      formData.append("fone", this.form.fone);
      formData.append("password", this.form.password);
      formData.append("ativo", this.form.ativo);
      formData.append("criadopor", this.$store.getters.user.id);
      formData.append("admin", this.form.admin);
      formData.append("idempresa", this.form.idempresa);
      formData.append("idfilial", this.form.idfilial);
     
      this.form.modulos.forEach((item, index) => {
        formData.append("idmodulos", parseInt(this.form.modulos[index]) );
      })
        console.log(formData.getAll("idmodulos"))
        

      // Colocar o indicador pq precisac


      usuarioNovo(formData).then((response) => {
        this.$message("Usuario Criado conforme solicitado!");
        this.$router.push("/administracao/usuarios/");
      });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    selecionarFilial(data) {
      this.form.filial = null;
      this.filialFiltrado = this.filiaisNovo.filter((filial) => {
        return filial.idempresa == data;
      });

      console.log(this.filialFiltrado);
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

