<template>
  <div>
    <el-dialog title="Alteração de Senha" :visible.sync="dialogFormVisible">
      <el-form :model="form">
      <el-form-item label="Senha Antiga" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.old_password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Nova senha" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.new_password1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Repetir senha" :label-width="formLabelWidth">
          <el-input type="password"  v-model="form.new_password2" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="submitAlterarSenha"
          >Confirma Alteração</el-button
        >
      </span>
    </el-dialog>
    <div class="navbar">
      <hamburger
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />

      <breadcrumb class="breadcrumb-container" />

      <div class="right-menu">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img
              :src="avatar + '?imageView2/1/w/80/h/80'"
              class="user-avatar"
            />
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
             <el-dropdown-item divided @click.native="alterarSenha">
              <span style="display: block">Alterar Senha</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">
              <span style="display: block">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { alterarSenhaUsuario } from "../../api/user"

export default {
  data() {
    return {
      form: {
        new_password1: "",
        new_password2: "",
        old_password: ""
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  methods: {
    submitAlterarSenha() {
      alterarSenhaUsuario(this.form).then( (reponse) => {

        this.dialogFormVisible = false
            this.$message({
            type: "success",
            message: "Senha alterada conforme solicitado!",
          });
      })

    },
    alterarSenha(){
      console.log("Clica em alterar senha")
      this.dialogFormVisible = true
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
