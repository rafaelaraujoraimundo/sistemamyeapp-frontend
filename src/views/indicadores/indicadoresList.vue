<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-button
          type="primary"
          @click="$router.push('/CadastroAV/Indicadores/Novo')"
          >Novo Indicador</el-button
        >
      </el-col>
    </el-row>
    <el-table :data="list" size="mini" stripe max-height="1024">
      <el-table-column
        fixed
        prop="periodo"
        label="Período"
        width="65"
      ></el-table-column>
      <el-table-column
        prop="indicador.id"
        label="ID"
        width="50"
      ></el-table-column>
      <el-table-column prop="indicador.descricao" label="Indicador Painel" width="290"></el-table-column>
      <el-table-column prop="descricao" label="Indicador" width="290"></el-table-column>
      <el-table-column prop="meta" label="Meta" width="95"> </el-table-column>
      <el-table-column
        prop="resultado"
        label="Resultado"
        width="95"
      ></el-table-column>

      <el-table-column fixed="right" label="Operations" width="170">
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
import { detalheindicador, ExcluirIndicador } from "@/api/dashboard";

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
      detalheindicador().then((response) => {
        this.list = response.results;
        this.listLoading = false;
      });
    },
    open(id, list) {
      this.$confirm("Tem certeza que deseja excluir?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      }).then(() => {
        ExcluirIndicador(id).then(() => {
          this.$message({
            type: "success",
            message: "Indicador deletado conforme solicitado!",
          });
          this.fetchData();
        });

      });
    },
    editarRow(id) {
      this.$router.push({ name: 'EditarIndicador' ,
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

