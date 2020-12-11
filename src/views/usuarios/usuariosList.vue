<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-button type="primary" @click="$router.push({ name: 'novousuario' })"
          >Novo Usuario</el-button
        >
      </el-col>
    </el-row>
    <el-table :data="list" size="mini" stripe max-height="1024">
    <el-table-column
        prop="email"
        label="Usuario"
        fixed
        width="250"
      ></el-table-column>
      <el-table-column
        prop="empresa.nomeempresa"
        label="Empresa"
        width="250"
      ></el-table-column>
        <el-table-column
        prop="filial.nomefilial"
        label="Filial"
        width="250"
      >
      </el-table-column>
        <el-table-column
        prop="first_name"
        label="Nome"
        width="100"
      >
            </el-table-column>
        <el-table-column
        prop="last_name"
        label="Sobrenome"
        width="150"
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
import { usuarioList, usuarioExcluir } from "@/api/user";

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
      usuarioList().then((response) => {
        this.list = response.results;
        console.log(this.list)
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
        usuarioExcluir(id).then(() => {
          this.$message({
            type: "success",
            message: "Usuario excluído conforme solicitado!",
            
          });
          this.fetchData();
          this.$router.push({ name: "usuariosList" });
        });
      });
    },
    editarRow(id) {
      this.$router.push({ name: "EditarUsuario", query: { id: id } });
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

