<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" label-position="top">
      <el-form-item label="Período de fechamento" >
        <el-col :span="11">
          <el-date-picker v-model="form.fechamento" type="date" placeholder="Data para fechamento" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Processar</el-button>
        <el-button type="danger" @click="deletarProcessamentoMensal">Excluir</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  processamentoMensal,
  exclusaoProcessamentoMensal,
} from "../../api/processamento";

export default {
  data() {
    return {
      form: {
        fechamento: '',
        periodo: ''
      }
    }
  },
  methods: {
      deletarProcessamentoMensal() {
      this.form.periodo = this.VerificaData(this.form.fechamento)
      delete this.form.fechamento
      this.$confirm("Tem certeza que deseja excluir o processamento ?", "Confirmação de Exclusão", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      }).then(() => {
        exclusaoProcessamentoMensal(this.form).then(() => {
        this.$message({
        message: 'Processamento excluido com sucesso!',
        type: 'success'
      })
      }).catch((error) => {
        console.log(error)
        this.$message({
        message: "Erro ao processar fechamento, favor verificar se existe dados nos indicadores com o Periodo Selecionado",
        type: 'warning'
      })
      })


      });
    },
    onSubmit() {
      this.form.periodo = this.VerificaData(this.form.fechamento)
      console.log(this.form.periodo)
      delete this.form.fechamento
      processamentoMensal(this.form).then(() => {
        this.$message({
        message: 'Processamento executado com sucesso!',
        type: 'success'
      })
      }).catch((error) => {
        console.log(error)
        this.$message({
        message: "Erro ao processar fechamento, favor verificar se existe dados nos indicadores com o Periodo Selecionado",
        type: 'warning'
      })
      })
      
    },
    VerificaData() {
      let data = this.form.fechamento;
      let YEAR = data.getFullYear();
      let MONTH = data.getMonth()+1;
     
      this.form.periodo = YEAR + ("0" + MONTH).slice(-2);
      return YEAR + ("0" + MONTH).slice(-2);
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

