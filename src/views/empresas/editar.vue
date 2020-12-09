<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      size="mini"
      label-position="top"
    >
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="Id" disabled>
            <el-input v-model="form.id" disabled />
          </el-form-item>
        </el-col>
                <el-col :span="6">
          <el-form-item label="Código Empresa">
            <el-input v-model="form.codempresa" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="Nome">
            <el-input v-model="form.nomeempresa" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20"> </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Ativo">
            <el-switch v-model="form.ativo" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Logo da Empresa">
            <input
              type="file"
              id="file"
              ref="file"
              v-on:change="handleFileUpload()"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Editar</el-button>
        <el-button @click="onCancel">Cancelar</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { empresaEditar, detalheEmpresaid } from "../../api/empresas";

export default {
  data() {
    return {
      form: {
        codempresa: "",
        nomeempresa: "",
        ativo: true,
        logoempresa: "",

      },
      file: "",
    };
  },
  created() {
    detalheEmpresaid(this.$route.query.id).then((response) => {
      this.form = response
      console.log(this.form)
    })
  },
  methods: {
    onSubmit() {
      let formData = new FormData();
      if(this.file) {
          formData.append("logoempresa", this.file);
      } else {
          formData.append("logoempresa", this.form.logoempresa);
      }
      
      formData.append("id", this.form.id)
      formData.append("codempresa", this.form.codempresa);
      formData.append("nomeempresa", this.form.nomeempresa);
      formData.append("ativo", this.form.ativo);
      formData.append("criadopor", this.$store.getters.user.id);

      // Colocar o indicador pq precisac
      empresaEditar(formData, this.form.id).then((response) => {
        this.$message("Empresa Criada conforme solicitado!");
        this.$router.push("/administracao/empresas/");
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

