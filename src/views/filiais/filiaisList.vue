<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-button type="primary" @click="$router.push({ name: 'novafilial' })"
          >Nova Filial</el-button
        >
      </el-col>
    </el-row>
    <el-table :data="list" size="mini" stripe max-height="1024">
      <el-table-column
        prop="empresa.nomeempresa"
        label="Empresa"
        width="250"
      ></el-table-column>
      <el-table-column prop="cnpj" label="CNPJ" width="120"></el-table-column>
      <el-table-column
        prop="idempresa"
        label="Código"
        width="70"
      ></el-table-column>
      <el-table-column
        prop="nomefilial"
        label="Nome"
        width="250"
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
import { filiaisList, filialExcluir } from "@/api/filiais";

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
      filiaisList().then((response) => {
        this.list = response.results;
        this.list.sort(function (a, b) {
          if (a.empresa.nomeempresa > b.empresa.nomeempresa) {
            return 1;
          }
          if (a.empresa.nomeempresa < b.empresa.nomeempresa) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });

        this.listLoading = false;
      });
    },
    open(id, list) {
      this.$confirm("Tem certeza que deseja excluir?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      }).then(() => {
        filialExcluir(id).then(() => {
          this.$message({
            type: "success",
            message: "Empresa excluída conforme solicitado!",
            
          });
          this.fetchData();
          this.$router.push({ name: "filiaisList", query: { id: id } });
        });
      });
    },
    editarRow(id) {
      this.$router.push({ name: "EditarFilial", query: { id: id } });
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

