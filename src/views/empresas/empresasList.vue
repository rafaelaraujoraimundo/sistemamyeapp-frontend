<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-button type="primary" @click="$router.push({ name: 'novaempresa' })"
          >Nova Empresa</el-button
        >
      </el-col>
    </el-row>
    <el-table :data="list" size="mini" stripe max-height="1024">
      <el-table-column
        prop="codempresa"
        label="Codigo"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="nomeempresa"
        label="Empresa"
        width="290"
      ></el-table-column>
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
            @click="editarRow(scope.row.id)"
            >Editar</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { empresaList, empresaExcluir } from "@/api/empresas";

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
      empresaList().then((response) => {
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
        empresaExcluir(id).then(() => {
          this.$message({
            type: "success",
            message: "Empresa excluída conforme solicitado!",
          });
          this.fetchData();
        });
      });
    },
    editarRow(id) {
      this.$router.push({ name: "EditarEmpresa", query: { id: id } });
    },
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

