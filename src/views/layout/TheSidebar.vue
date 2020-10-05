<template>
  <nly-wrapper-sidebar hover variant="darkPink">
    <nly-sidebar>
      <nly-sidebar-brand to="/" variant="dark">
        <nly-sidebar-brandimg :src="logo" elevation circle />
        <nly-sidebar-brandtext>NLY Adminlte Vue</nly-sidebar-brandtext>
      </nly-sidebar-brand>

      <nly-render-function
        flat
        :content-to-render="sidebarList"
        v-if="sidebar"
      />
    </nly-sidebar>
  </nly-wrapper-sidebar>
</template>

<script>
import logo from "../../assets/static/NLYLOGO.png";
export default {
  name: "TheSidebar",
  props: {
    sidebar: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      logo
    };
  },
  computed: {
    sidebarList() {
      console.log(this.$route.path);
      const sidebarChildren = this.sidebar.map(item => {
        if (item.router && !item.children) {
          return {
            _type: "nly-sidebar-nav-item",
            _name: item.name,
            to: { name: item.router },
            exact: true,
            icon: item.icon
          };
        } else if (!item.router && item.children) {
          const tree = {
            _type: "nly-sidebar-nav-tree",
            _children: [],
            target: String(item.id),
            visible: this.$route.path.indexOf(item.active) == 1 ? true : false,
            icon: item.icon,
            text: item.name,
            active: this.$route.path.indexOf(item.active) == 1 ? true : false
          };

          const treeChildren = item.children.map(itemChild => {
            return {
              _type: "nly-sidebar-nav-item",
              _name: itemChild.name,
              to: { name: itemChild.router },
              exact: true,
              icon: itemChild.icon
            };
          });
          tree._children = treeChildren;

          return tree;
        } else {
          return {
            _type: "nly-sidebar-nav-header",
            _name: item.name
          };
        }
      });

      const sidebarVnode = [
        {
          _type: "nly-sidebar-nav",
          _children: sidebarChildren,
          // legacy: true,
          childIndent: true,
          sidebarNavClass: "mt-2"
        }
      ];
      return sidebarVnode;
    }
  }
};
</script>
