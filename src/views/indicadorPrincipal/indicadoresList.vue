<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-button
          type="primary"
          @click="$router.push('/CadastroAV/IndicadorPrincipal/Novo')"
          >Novo</el-button
        >
      </el-col>
    </el-row>
    <el-table :data="list" size="mini" stripe max-height="1024">
      <el-table-column
        prop="codigo"
        label="Codigo"
        width="70"
      ></el-table-column>
      <el-table-column prop="descricao" label="Indicador Principal" width="290"></el-table-column>
      <el-table-column prop="modo" label="Modo de Cálculo" width="290"></el-table-column>
      <el-table-column prop="peso" label="Peso" width="95"> </el-table-column>
        <el-table-column label="Operations" width="170">
        <template slot-scope="scope">
          <el-button
            @click="open(scope.row.id, list)"
            type="danger"
            size="small"
            >Excluir</el-button
          >
          <el-button 
          type="primary" 
          size="small"
          @click="editarRow(scope.row.id)">Editar</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { indicadorPrincipalList, ExcluirIndicadorPrincipal } from "@/api/indicadorPrincipal";

export default {
  data() {
    return {
      list: [],
      listLoading: true,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      indicadorPrincipalList().then((response) => {
        this.list = response.results;
        this.listLoading = false;
      });
    },
    open(id, list) {
      this.$confirm("Tem certeza que deseja excluir?", "Confirmação de Exclusão", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      }).then(() => {
        ExcluirIndicadorPrincipal(id).then(() => {
          this.$message({
            type: "success",
            message: "Indicador deletado conforme solicitado!",
          });
          this.fetchData();
        });

      });
    },
    editarRow(id) {
      this.$router.push({ name: 'EditarIndicadorPrincipal' ,
                query: {id: id} ,
                })
    }
  },
};
</script>
<style>
.el-col {
  border-radius: 6px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>

