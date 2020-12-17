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
      <el-table-column prop="filial.nomefilial" label="Filial" width="250">
      </el-table-column>
      <el-table-column prop="first_name" label="Nome" width="100">
      </el-table-column>
      <el-table-column
        prop="last_name"
        label="Sobrenome"
        width="150"
      ></el-table-column>
      <el-table-column label="Operações" width="138">
        <template slot-scope="scope">
          <el-button-group>
          <el-tooltip content="Envia email para Alteração de Senha" placement="bottom" effect="light">
          <el-button
            @click="altSenha(scope.row.email, list)"
            type="info"
            icon="el-icon-message"
            circle

          ></el-button>
          </el-tooltip>
           <el-tooltip content="Excluir usuario" placement="bottom" effect="light">
          <el-button
            @click="open(scope.row.id, list)"
            type="danger"
            icon="el-icon-delete"
            circle

          ></el-button>
           </el-tooltip>
           <el-tooltip content="Editar Usuario" placement="bottom" effect="light">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editarRow(scope.row.id)"

          ></el-button>
           </el-tooltip>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { usuarioList, usuarioExcluir, resetemail } from "@/api/user";

export default {
  data() {
    return {
      list: [],
      listLoading: true,
      form: {
        email: "",
      },
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
    altSenha(email, list) {
      this.form.email = email;
      
      resetemail(this.form).then((response) => {
       
      });
       this.$message({
          type: "success",
          message:
            "Email para alteração de enviado, favor verificar em sua caixa de entrada!",
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

