<template>
  <nly-card>
    <nly-card-body>
      <nly-row>
        <nly-col xs="12" sm="6" md="4" lg="3" class="my-1">
          <nly-form-group
            label="用户名"
            label-cols-sm="4"
            label-align-sm="right"
            label-size="sm"
            label-for="filter-username"
            class="mb-0"
          >
            <nly-input-group size="sm">
              <nly-form-input
                v-model="filter.username"
                type="text"
                id="filter-username"
                placeholder="请输入用户名"
              ></nly-form-input>
              <nly-input-group-append>
                <nly-button
                  variant="info"
                  :disabled="!filter.username"
                  @click="filter.username = ''"
                  >重置</nly-button
                >
              </nly-input-group-append>
            </nly-input-group>
          </nly-form-group>
        </nly-col>

        <nly-col xs="12" sm="6" md="4" lg="3" class="my-1">
          <nly-form-group
            label="手机号"
            label-cols-sm="4"
            label-align-sm="right"
            label-size="sm"
            label-for="filter-userphone"
            class="mb-0"
          >
            <nly-input-group size="sm">
              <nly-form-input
                v-model="filter.userphone"
                type="text"
                id="filter-userphone"
                placeholder="请输入手机号"
              ></nly-form-input>
              <nly-input-group-append>
                <nly-button
                  variant="info"
                  :disabled="!filter.userphone"
                  @click="filter.userphone = ''"
                  >重置</nly-button
                >
              </nly-input-group-append>
            </nly-input-group>
          </nly-form-group>
        </nly-col>

        <nly-col xs="12" sm="6" md="4" lg="3" class="my-1">
          <nly-form-group
            label="邮箱"
            label-cols-sm="4"
            label-align-sm="right"
            label-size="sm"
            label-for="filter-useremail"
            class="mb-0"
          >
            <nly-input-group size="sm">
              <nly-form-input
                v-model="filter.useremail"
                type="text"
                id="filter-useremail"
                placeholder="请输入邮箱"
              ></nly-form-input>
              <nly-input-group-append>
                <nly-button
                  variant="info"
                  :disabled="!filter.useremail"
                  @click="filter.useremail = ''"
                  >重置</nly-button
                >
              </nly-input-group-append>
            </nly-input-group>
          </nly-form-group>
        </nly-col>

        <nly-col xs="12" sm="6" md="4" lg="3" class="my-1">
          <nly-form-group
            label="用户类型"
            label-cols-sm="4"
            label-align-sm="right"
            label-size="sm"
            label-for="filter-usertype"
            class="mb-0"
          >
            <nly-form-select
              v-model="filter.usertype"
              :options="usertypeOptions"
              id="filter-usertype"
              size="sm"
            >
            </nly-form-select>
          </nly-form-group>
        </nly-col>

        <nly-col xs="12" sm="6" md="4" lg="3" class="my-1">
          <nly-form-group
            label="是否停用"
            label-cols-sm="4"
            label-align-sm="right"
            label-size="sm"
            label-for="filter-isdelete"
            class="mb-0"
          >
            <nly-form-select
              v-model="filter.isdelete"
              :options="isdeleteOptions"
              id="filter-isdelete"
              size="sm"
            >
            </nly-form-select>
          </nly-form-group>
        </nly-col>
      </nly-row>
      <nly-row>
        <nly-col
          class="my-2 text-center text-sm-left"
          xs="12"
          sm="6"
          lg="8"
          xl="10"
          order-sm="1"
          order-xs="2"
        >
          <nly-button-group>
            <nly-button
              @click="selectAllRows"
              v-nly-tooltip.hover="{ variant: 'info' }"
              title="全选数据"
            >
              <nly-icon
                :icon="
                  selectedAllRows
                    ? 'fas nlyfont nly-icon-success text-green'
                    : 'fas nlyfont nly-icon-check text-secondary'
                "
              />
            </nly-button>

            <nly-button
              button-class="text-danger"
              @click="showDeleteListMsgBox"
              v-nly-tooltip.hover="{ variant: 'danger' }"
              title="批量停用用户"
            >
              <nly-icon icon="far fa-stop-circle" />
            </nly-button>

            <nly-button
              button-class="text-success"
              @click="queryData"
              v-nly-tooltip.hover="{ variant: 'success' }"
              title="查询数据"
            >
              <nly-icon icon="fas nlyfont nly-icon-search" />
            </nly-button>

            <nly-button
              button-class="text-warning"
              @click="resetQueryCriteria"
              v-nly-tooltip.hover="{ variant: 'warning' }"
              title="重置刷新条件"
            >
              <nly-icon icon="fas nlyfont nly-icon-close" />
            </nly-button>

            <nly-button
              @click="refreshData"
              button-class="text-primary"
              v-nly-tooltip.hover="{ variant: 'primary' }"
              title="刷新当前数据"
            >
              <nly-icon icon="fas nlyfont nly-icon-refresh" />
            </nly-button>

            <nly-button
              @click="goAdd"
              button-class="text-navy"
              v-nly-tooltip.hover="{ variant: 'navy' }"
              title="新增管理员"
            >
              <nly-icon icon="fas nlyfont nly-icon-new" />
            </nly-button>
          </nly-button-group>
        </nly-col>

        <nly-col
          xs="12"
          sm="6"
          lg="4"
          xl="2"
          class="my-1"
          order-md="2"
          order-sm="1"
        >
          <nly-form-group
            label="数量/每页"
            label-cols-sm="4"
            label-align-sm="right"
            label-size="sm"
            label-for="perPageSizeSelect"
            class="mb-0"
          >
            <nly-form-select
              v-model="perPageSize"
              id="perPageSizeSelect"
              size="sm"
              :options="perPageSizeOptions"
            ></nly-form-select>
          </nly-form-group>
        </nly-col>
      </nly-row>

      <div class="table-responsive">
        <nly-table
          ref="selectableTable"
          selectable
          select-mode="multi"
          :items="items"
          :fields="fields"
          @row-selected="onRowSelected"
          outlined
          :busy="isBusy"
          striped
          bordered
          sticky-header
          hover
          small
          show-empty
          empty-text="空空如也"
          stacked="sm"
          table-class="text-nowrap table-valign-middle"
        >
          <!-- 加载效果 -->
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <nly-spinner class="align-middle"></nly-spinner>
              <strong> 正在努力加载数据</strong>
            </div>
          </template>

          <!-- 单选效果 -->
          <template v-slot:cell(isSelected)="{ rowSelected }">
            <template v-if="rowSelected">
              <nly-icon
                icon="nlyfont nly-icon-success"
                class="text-md text-green"
              />
              <span class="sr-only">Selected</span>
            </template>
            <template v-else>
              <nly-icon
                icon="nlyfont nly-icon-check"
                class="text-md text-secondary"
              />
              <span class="sr-only">Not selected</span>
            </template>
          </template>

          <!-- 用户id -->
          <template v-slot:cell(base_user)="data">
            <nly-badge>
              {{ data.item.base_user }}
            </nly-badge>
          </template>

          <!-- 用户名 -->
          <template v-slot:cell(username)="data">
            <nly-badge>
              {{ data.item.username }}
            </nly-badge>
          </template>

          <!-- 用户资料id -->
          <template v-slot:cell(id)="data">
            <nly-badge>
              {{ data.item.id }}
            </nly-badge>
          </template>

          <!-- 创建人 -->
          <template v-slot:cell(create_user)="data">
            <nly-badge>
              {{ data.item.create_user }}
            </nly-badge>
          </template>

          <!-- =更新人 -->
          <template v-slot:cell(update_user)="data">
            <nly-badge>
              {{ data.item.update_user }}
            </nly-badge>
          </template>

          <!-- 用户类型 -->
          <template v-slot:cell(user_type)="data">
            <nly-badge :variant="data.item.user_type === 1 ? 'info' : 'dark'">
              {{ data.item.user_type === 1 ? "超级用户" : "普通用户" }}
            </nly-badge>
          </template>

          <!-- 用户邮箱 -->
          <template v-slot:cell(user_email)="data">
            <svg
              class="svg-blog-icon text-lg"
              aria-hidden="true"
              v-if="data.item.user_email"
            >
              <use xlink:href="#blog-icon-MAILBOX"></use>
            </svg>
            <nly-badge badge-class="text-xs" v-if="data.item.user_email">
              {{ data.item.user_email }}
            </nly-badge>
            <nly-badge v-else> --</nly-badge>
          </template>

          <!-- 用户手机 -->
          <template v-slot:cell(user_phone)="data">
            <svg
              class="svg-blog-icon text-lg"
              aria-hidden="true"
              v-if="data.item.user_phone"
            >
              <use xlink:href="#blog-icon-COFFEEAPP"></use>
            </svg>

            <nly-badge badge-class="text-xs" v-if="data.item.user_phone">
              {{ data.item.user_phone }}
            </nly-badge>
            <nly-badge badge-class="text-xs" v-else>
              --
            </nly-badge>
          </template>

          <!-- 是否停用 -->
          <template v-slot:cell(is_delete)="data">
            <nly-badge :variant="data.item.is_delete ? 'danger' : 'info'">
              {{ data.item.is_delete ? "是" : "否" }}
            </nly-badge>
          </template>

          <!-- 用户生日 -->
          <template v-slot:cell(user_birthday)="data">
            <svg
              class="svg-blog-icon text-lg"
              aria-hidden="true"
              v-if="data.item.user_birthday"
            >
              <use xlink:href="#blog-icon-shijian2"></use>
            </svg>
            <nly-badge v-if="data.item.user_birthday">
              {{ data.item.user_birthday }}
            </nly-badge>
            <nly-badge v-else>
              --
            </nly-badge>
          </template>

          <!-- 用户创建日期 -->
          <template v-slot:cell(create_date)="data">
            <svg
              class="svg-blog-icon text-lg"
              aria-hidden="true"
              v-if="data.item.create_date"
            >
              <use xlink:href="#blog-icon-shijian"></use>
            </svg>

            <nly-badge v-if="data.item.create_date">
              {{ data.item.create_date }}
            </nly-badge>
            <nly-badge v-else>
              --
            </nly-badge>
          </template>

          <!-- 用户更新日期 -->
          <template v-slot:cell(update_date)="data">
            <svg
              class="svg-blog-icon text-lg"
              aria-hidden="true"
              v-if="data.item.update_date"
            >
              <use xlink:href="#blog-icon-TIME"></use>
            </svg>

            <nly-badge v-if="data.item.update_date">
              {{ data.item.update_date }}
            </nly-badge>
            <nly-badge v-else>
              --
            </nly-badge>
          </template>

          <!-- 用户注册ip -->
          <template v-slot:cell(user_ip)="data">
            <svg
              class="svg-blog-icon text-lg"
              aria-hidden="true"
              v-if="data.item.user_ip"
            >
              <use xlink:href="#blog-icon-IP"></use>
            </svg>
            <nly-badge v-if="data.item.user_ip">
              {{ data.item.user_ip }}
            </nly-badge>
            <nly-badge v-else>
              --
            </nly-badge>
          </template>

          <!-- 用户最近登录ip -->
          <template v-slot:cell(user_last_login_ip)="data">
            <svg
              class="svg-blog-icon text-lg"
              aria-hidden="true"
              v-if="data.item.user_ip"
            >
              <use xlink:href="#blog-icon-IP1"></use>
            </svg>
            <nly-badge v-if="data.item.user_ip">
              {{ data.item.user_last_login_ip }}
            </nly-badge>
            <nly-badge v-else>
              --
            </nly-badge>
          </template>

          <!-- 用户最近登录时间 -->
          <template v-slot:cell(user_last_login_time)="data">
            <svg
              class="svg-blog-icon text-lg"
              aria-hidden="true"
              v-if="data.item.user_last_login_time"
            >
              <use xlink:href="#blog-icon-shijian1"></use>
            </svg>
            <nly-badge v-if="data.item.user_last_login_time">
              {{ data.item.user_last_login_time }}
            </nly-badge>
            <nly-badge v-else>
              --
            </nly-badge>
          </template>

          <!-- 用户性别 -->
          <template v-slot:cell(user_gender)="data">
            <svg class="svg-blog-icon text-lg" aria-hidden="true">
              <use
                :xlink:href="
                  data.item.user_gender === 1
                    ? '#blog-icon-man'
                    : '#blog-icon-woman'
                "
              ></use>
            </svg>
            {{ data.item.gender }}
          </template>

          <!-- 用户经验 -->
          <template v-slot:cell(user_exp)="data">
            <nly-icon icon="blog blog-icon-exp text-lg text-blue" />
            <nly-badge> {{ data.item.user_exp }} </nly-badge>
          </template>

          <!-- 用户等级 -->
          <template v-slot:cell(user_level)="data">
            <nly-icon
              :icon="'blog blog-icon-level-' + data.item.user_level"
              :class="
                data.item.user_level < 2
                  ? 'text-navy text-lg'
                  : data.item.user_level < 5
                  ? 'text-indigo text-lg'
                  : data.item.user_level < 8
                  ? 'text-orange text-lg'
                  : data.item.user_level < 11
                  ? 'text-pink text-lg'
                  : 'text-danger text-lg'
              "
            />
          </template>

          <!-- 用户头像 -->
          <template v-slot:cell(user_pic)="data">
            <img :src="data.item.user_pic" class="user-image  elevation-1" />
          </template>

          <!-- 操作按钮 -->
          <template v-slot:cell(action)="row">
            <nly-button
              size="xs"
              variant="primary"
              class="mr-2"
              @click="goEditor(row)"
            >
              <nly-icon icon="fas fa-pencil-alt" />
              <nly-badge>
                {{ action.editor }}
              </nly-badge>
            </nly-button>
            <nly-button
              size="xs"
              variant="danger"
              class="mr-2"
              @click="showDeleteMsgBox(row)"
              v-if="!row.item.is_delete"
            >
              <nly-icon icon="far fa-stop-circle" />
              <nly-badge>
                {{ action.stop }}
              </nly-badge>
            </nly-button>
            <nly-button
              size="xs"
              variant="info"
              class="mr-2"
              @click="showLaunchMsgBox(row)"
              v-if="row.item.is_delete"
            >
              <nly-icon icon="far fa-play-circle" />
              <nly-badge>
                {{ action.launch }}
              </nly-badge>
            </nly-button>
          </template>
        </nly-table>
      </div>

      <nly-pagination
        ref="pagination"
        :total="total"
        :size="perPageSize"
        :limit="limit"
        sm
        show-pg
        align="center"
        :currentPage="currentPage"
        :firstFunction="firstFunction"
        :prevFunction="prevFunction"
        :currentFunction="currentFunction"
        :nextFunction="nextFunction"
        :lastFunction="lastFunction"
        :sizeFunction="sizeFunction"
        @getCurrentPage="getCurrentPage"
      />

      <nly-modal v-model="editorModal" centered hide-header size="lg">
        <nly-container fluid>
          <nly-row>
            <nly-col xs="12" sm="6" class="my-1">
              <nly-form-group
                label="用户名"
                label-cols-sm="4"
                label-align-sm="right"
                label-size="sm"
                label-for="editor-username"
                class="mb-0"
                :invalid-feedback="feedback.usernameInvalid"
                :valid="valid.usernameState"
              >
                <nly-form-input
                  size="sm"
                  v-model="editor.username"
                  type="text"
                  id="editor-username"
                  :valid="valid.usernameState"
                  @blur="blurUsernameEditor"
                  @input="changeUsernameEditor"
                  trim
                ></nly-form-input>
              </nly-form-group>
            </nly-col>

            <nly-col xs="12" sm="6" class="my-1">
              <nly-form-group
                label="用户类型"
                label-cols-sm="4"
                label-align-sm="right"
                label-size="sm"
                label-for="editor-usertype"
                class="mb-0"
              >
                <nly-form-select
                  v-model="editor.user_type"
                  :options="usertypeOptions"
                  id="editor-usertype"
                  size="sm"
                >
                </nly-form-select>
              </nly-form-group>
            </nly-col>

            <nly-col xs="12" sm="6" class="my-1">
              <nly-form-group
                label="手机号"
                label-cols-sm="4"
                label-align-sm="right"
                label-size="sm"
                label-for="editor-user_phone"
                class="mb-0"
                :invalid-feedback="feedback.phoneInvalid"
                :valid="valid.phoneState"
              >
                <nly-form-input
                  size="sm"
                  v-model="editor.user_phone"
                  type="tel"
                  id="editor-user_phone"
                  :valid="valid.phoneState"
                  @blur="blurPhoneEditor"
                  trim
                  :maxlength="11"
                ></nly-form-input>
              </nly-form-group>
            </nly-col>

            <nly-col xs="12" sm="6" class="my-1">
              <nly-form-group
                label="邮箱"
                label-cols-sm="4"
                label-align-sm="right"
                label-size="sm"
                label-for="editor-user_email"
                class="mb-0"
                :invalid-feedback="feedback.emailInvalid"
                :valid="valid.emailState"
              >
                <nly-form-input
                  size="sm"
                  v-model="editor.user_email"
                  type="email"
                  id="editor-user_email"
                  :valid="valid.emailState"
                  @blur="blurEmailEditor"
                  trim
                ></nly-form-input>
              </nly-form-group>
            </nly-col>

            <nly-col xs="12" sm="6" class="my-1">
              <nly-form-group
                label="用户等级"
                label-cols-sm="4"
                label-align-sm="right"
                label-size="sm"
                label-for="editor-user_level"
                class="mb-0"
                :invalid-feedback="feedback.levelInvalid"
                :valid="valid.levelState"
              >
                <nly-form-input
                  size="sm"
                  v-model="editor.user_level"
                  type="number"
                  id="editor-user_level"
                  :valid="valid.levelState"
                  @blur="blurLevelEditor"
                  trim
                ></nly-form-input>
              </nly-form-group>
            </nly-col>

            <nly-col xs="12" sm="6" class="my-1">
              <nly-form-group
                label="用户经验值"
                label-cols-sm="4"
                label-align-sm="right"
                label-size="sm"
                label-for="editor-user_exp"
                class="mb-0"
                :invalid-feedback="feedback.expInvalid"
                :valid="valid.expState"
              >
                <nly-form-input
                  size="sm"
                  v-model="editor.user_exp"
                  type="number"
                  id="editor-user_exp"
                  :valid="valid.expState"
                  @blur="blurExpEditor"
                  trim
                ></nly-form-input>
              </nly-form-group>
            </nly-col>

            <nly-col xs="12" sm="6" class="my-1">
              <nly-form-group
                label="最近登录时间"
                label-cols-sm="4"
                label-align-sm="right"
                label-size="sm"
                label-for="editor-user_last_login_time"
                class="mb-0"
              >
                <nly-form-input
                  disabled
                  size="sm"
                  :value="editor.user_last_login_time"
                  type="number"
                  id="editor-user_last_login_time"
                  trim
                ></nly-form-input>
              </nly-form-group>
            </nly-col>

            <nly-col xs="12" sm="6" class="my-1">
              <nly-form-group
                label="用户生日"
                label-cols-sm="4"
                label-align-sm="right"
                label-size="sm"
                label-for="editor-user_exp"
                class="mb-0"
              >
                <nly-form-datepicker
                  :value="selectUserBirthday"
                  single-date-picker
                  :locale-data="birthDayLocaleData"
                  @update="userBirthdayUpdate"
                  size="sm"
                  show-dropdowns
                  :ranges="false"
                  always-show-calendars
                >
                  <template v-slot:append>
                    <nly-input-group-text>
                      <nly-icon icon="nlyfont nly-icon-time" />
                    </nly-input-group-text>
                  </template>
                </nly-form-datepicker>
              </nly-form-group>
            </nly-col>

            <nly-col xs="12" sm="6" class="my-1">
              <nly-form-group
                label="性别"
                label-cols-sm="4"
                label-align-sm="right"
                label-size="sm"
                label-for="editor-user_gender"
                class="mb-0"
              >
                <nly-form-select
                  size="sm"
                  v-model="editor.user_gender"
                  :options="[
                    { value: null, text: '请选择', disabled: true },
                    { value: 1, text: '男' },
                    { value: 2, text: '女' }
                  ]"
                  id="editor-user_gender"
                  trim
                ></nly-form-select>
              </nly-form-group>
            </nly-col>

            <nly-col xs="12" sm="6" class="my-1">
              <nly-form-group
                label="注册ip"
                label-cols-sm="4"
                label-align-sm="right"
                label-size="sm"
                label-for="editor-user_ip"
                class="mb-0"
              >
                <nly-form-input
                  disabled
                  size="sm"
                  :value="editor.user_ip"
                  id="editor-user_ip"
                  trim
                ></nly-form-input>
              </nly-form-group>
            </nly-col>

            <nly-col xs="12" sm="6" class="my-1">
              <nly-form-group
                label="最近登录ip"
                label-cols-sm="4"
                label-align-sm="right"
                label-size="sm"
                label-for="editor-user_last_login_ip"
                class="mb-0"
              >
                <nly-form-input
                  disabled
                  size="sm"
                  :value="editor.user_last_login_ip"
                  id="editor-user_last_login_ip"
                  trim
                ></nly-form-input>
              </nly-form-group>
            </nly-col>

            <nly-col xs="12" sm="6" class="my-1">
              <nly-form-group
                label="创建时间"
                label-cols-sm="4"
                label-align-sm="right"
                label-size="sm"
                label-for="editor-create_date"
                class="mb-0"
              >
                <nly-form-input
                  disabled
                  size="sm"
                  :value="editor.create_date"
                  id="editor-create_date"
                  trim
                ></nly-form-input>
              </nly-form-group>
            </nly-col>

            <nly-col xs="12" sm="6" class="my-1">
              <nly-form-group
                label="更新时间"
                label-cols-sm="4"
                label-align-sm="right"
                label-size="sm"
                label-for="editor-update_date"
                class="mb-0"
              >
                <nly-form-input
                  disabled
                  size="sm"
                  :value="editor.update_date"
                  id="editor-update_date"
                  trim
                ></nly-form-input>
              </nly-form-group>
            </nly-col>

            <nly-col xs="12" sm="6" class="my-1">
              <nly-form-group
                label="是否停用"
                label-cols-sm="4"
                label-align-sm="right"
                label-size="sm"
                label-for="editor-is_delete"
                class="mb-0"
              >
                <nly-form-select
                  disabled
                  size="sm"
                  v-model="editor.is_delete"
                  :options="[
                    { value: null, text: '请选择', disabled: true },
                    { value: false, text: '否' },
                    { value: true, text: '是' }
                  ]"
                  id="editor-is_delete"
                  trim
                ></nly-form-select>
              </nly-form-group>
            </nly-col>

            <nly-col xs="12" sm="6" class="my-1">
              <nly-form-group
                label="更新人"
                label-cols-sm="4"
                label-align-sm="right"
                label-size="sm"
                label-for="editor-create_user"
                class="mb-0"
              >
                <nly-form-input
                  disabled
                  size="sm"
                  :value="editor.create_user"
                  id="editor-create_user"
                  trim
                ></nly-form-input>
              </nly-form-group>
            </nly-col>

            <nly-col xs="12" sm="6" class="my-1">
              <nly-form-group
                label="更新人"
                label-cols-sm="4"
                label-align-sm="right"
                label-size="sm"
                label-for="editor-update_user"
                class="mb-0"
              >
                <nly-form-input
                  disabled
                  size="sm"
                  :value="editor.update_user"
                  id="editor-update_user"
                  trim
                ></nly-form-input>
              </nly-form-group>
            </nly-col>
          </nly-row>
        </nly-container>

        <template v-slot:modal-footer>
          <nly-button
            size="sm"
            variant="success"
            @click="submitEditorUser"
            :disabled="valid.usernameState === 'loading'"
          >
            确定
          </nly-button>
          <nly-button size="sm" variant="danger" @click="cancelEditorUser">
            取消
          </nly-button>
        </template>
      </nly-modal>
    </nly-card-body>
  </nly-card>
</template>

<script>
import dataUtil from "../../utils/date-time/native";
export default {
  name: "UserList",
  data() {
    return {
      items: null,
      fields: null,
      isBusy: false,
      selected: [],
      selectedAllRows: false,
      perPageSizeOptions: [5, 10, 15, 20, 25, 30],
      perPageSize: 10,
      currentPage: 1,
      total: "",
      limit: 5,
      filter: {
        username: "",
        userphone: "",
        useremail: "",
        usertype: null,
        isdelete: null
      },
      usertypeOptions: this.$renderContext.userList.usertypeOptions,
      isdeleteOptions: this.$renderContext.userList.isdeleteOptions,
      action: this.$renderContext.action,
      editorModal: false,
      editor: {
        id: undefined,
        username: undefined,
        base_user: undefined,
        user_type: undefined,
        user_phone: undefined,
        user_email: undefined,
        user_level: undefined,
        user_exp: undefined,
        user_last_login_time: undefined,
        user_birthday: undefined,
        user_gender: undefined,
        user_ip: undefined,
        user_last_login_ip: undefined,
        create_date: undefined,
        update_date: undefined,
        is_delete: undefined,
        create_user: undefined,
        update_user: undefined
      },
      feedback: {
        usernameInvalid: "",
        phoneInvalid: "",
        emailInvalid: "",
        levelInvalid: "",
        expInvalid: ""
      },
      valid: {
        usernameState: "novalid",
        phoneState: "novalid",
        emailState: "novalid",
        levelState: "novalid",
        expState: "novalid"
      },
      selectUserBirthday: {
        startDate: null,
        endDate: null
      },
      birthDayLocaleData: { firstDay: 1, format: "yyyy-mm-dd" },
      isClickEditorOk: false
    };
  },
  methods: {
    // 单选数据
    onRowSelected(items) {
      this.selected = items;
    },

    // 全选数据
    selectAllRows() {
      if (this.selectedAllRows == true) {
        this.$refs.selectableTable.clearSelected();
        this.selectedAllRows = false;
      } else {
        this.$refs.selectableTable.selectAllRows();
        this.selectedAllRows = true;
      }
    },

    // 编辑用户姓名输入框失去焦点
    blurUsernameEditor() {
      if (
        this.editor.username === undefined ||
        this.editor.username.length === 0
      ) {
        this.feedback.usernameInvalid = "用户名不能为空";
        this.valid.usernameState = "invalid";
      } else {
        if (this.editor.old_username === this.editor.username) {
          this.feedback.usernameInvalid = "";
          this.valid.usernameState = "novalid";
          return;
        }
        const obj = this;
        const params = {
          username: this.editor.username,
          user_id: this.editor.user_id
        };
        this.$api.HttpsUserList.checkUsername(obj, params);
      }
    },

    // 修改用户名触发
    changeUsernameEditor() {
      this.valid.usernameState = "loading";
    },

    // 编辑用户电话输入框失去焦点
    blurPhoneEditor() {
      const user_phone = this.editor.user_phone;
      if (user_phone === undefined || user_phone.length === 0) {
        this.feedback.phoneInvalid = "";
        this.valid.phoneState = "novalid";
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(user_phone)) {
        this.feedback.phoneInvalid = "手机号码格式不对";
        this.valid.phoneState = "invalid";
      } else {
        this.feedback.phoneInvalid = "";
        this.valid.phoneState = "novalid";
      }
    },

    // 编辑用户邮箱失去焦点
    blurEmailEditor() {
      const email = this.editor.user_email;
      if (email === undefined || email.length === 0) {
        this.feedback.emailInvalid = "邮箱不能为空";
        this.valid.emailState = "invalid";
        return;
      }
      if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email)) {
        this.feedback.emailInvalid = "邮箱格式不对";
        this.valid.emailState = "invalid";
        return;
      }
      this.feedback.emailInvalid = "";
      this.valid.emailState = "novalid";
    },

    // 编辑用户等级数去焦点
    blurLevelEditor() {
      if (this.editor.user_level >= 1 && this.editor.user_level < 15) {
        this.feedback.levelInvalid = "";
        this.valid.levelState = "novalid";
        return;
      } else {
        this.feedback.levelInvalid = "等级必须大于0,且小于16";
        this.valid.levelState = "invalid";
      }
    },

    // 编辑用户经验失去焦点
    blurExpEditor() {
      if (this.editor.user_exp >= 0) {
        this.feedback.expInvalid = "";
        this.valid.expState = "novalid";
        return;
      } else {
        this.feedback.expInvalid = "经验值应该大于0";
        this.valid.expState = "invalid";
      }
    },

    // 校验当前表单状态
    editorUserFormValid() {
      Object.values(this.feedback).forEach(item => {
        if (item !== "") {
          const toastVnode = {
            message: item,
            variant: this.$renderContext.editorUserMsgBox.variant,
            title: this.$renderContext.editorUserMsgBox.title,
            content: this.$renderContext.editorUserMsgBox.content
          };
          const obj = this;
          this.$toast(obj, toastVnode);

          return false;
        }
      });

      return true;
    },

    // 异步执行验证函数，防止没有失去焦距直接提交数据
    // async editorUserValid() {
    //   await this.blurUsernameEditor();
    //   await this.blurPhoneEditor();
    //   await this.blurEmailEditor();
    //   await this.blurLevelEditor;
    //   await this.blurExpEditor();
    //   await this.editorUserFormValid();
    //   const blurUsernameEditor = await this.blurUsernameEditor();

    //   console.log(blurUsernameEditor);
    // },

    // 提交编辑用户
    submitEditorUser() {
      const feedback_list = [];
      Object.values(this.feedback).forEach(item => {
        if (item !== "") {
          feedback_list.push(item);
        }
      });

      if (this.valid.usernameState !== "novalid") {
        return;
      }

      if (feedback_list.length >= 1) {
        return;
      }

      if (this.isClickEditorOk) {
        return;
      }

      this.isClickEditorOk = true;
      const params = this.editor;
      const obj = this;
      this.$api.HttpsUserList.editorUser(obj, params);
    },

    // 取消编辑用户
    cancelEditorUser() {
      this.editorModal = false;
    },

    // 创建用户
    goAdd() {},

    // 编辑用户生日获取值
    userBirthdayUpdate(value) {
      this.editor.user_birthday = dataUtil.format(
        value.startDate,
        "yyyy-mm-dd"
      );
    },

    // 编辑数据
    goEditor(row) {
      this.editor = {
        id: row.item.id,
        old_username: row.item.username,
        username: row.item.username,
        base_user: row.item.base_user,
        user_type: row.item.user_type,
        user_phone: row.item.user_phone,
        user_email: row.item.user_email,
        user_level: row.item.user_level,
        user_exp: row.item.user_exp,
        user_last_login_time: row.item.user_last_login_time,
        user_birthday: row.item.user_birthday,
        user_gender: row.item.user_gender,
        user_ip: row.item.user_ip,
        user_last_login_ip: row.item.user_last_login_ip,
        create_date: row.item.create_date,
        update_date: row.item.update_date,
        is_delete: row.item.is_delete,
        create_user: row.item.create_user,
        update_user: row.item.update_user
      };
      this.selectUserBirthday = {
        startDate: row.item.user_birthday,
        endDate: row.item.user_birthday
      };
      this.editorModal = true;
    },

    // 启用用户
    launchData(row) {
      const selectedData = {
        user_id: row.item.id,
        base_user_id: row.item.base_user
      };
      const obj = this;
      this.$api.HttpsUserList.launchUser(obj, selectedData);
    },

    // 启用用户
    showLaunchMsgBox(row) {
      const username = row.item.username;
      const h = this.$createElement;
      const msg = `您将启用用户 ${username} `;
      const msgVnodes = h(
        "span",
        { class: "text-sm", style: { "font-weight": 700 } },
        msg
      );
      this.$nlyaModal
        .msgBoxConfirm([msgVnodes], {
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "确定",
          cancelTitle: "取消",
          footerClass: "p-2",
          hideHeader: true,
          centered: true
        })
        .then(value => {
          if (value) {
            this.launchData(row);
          }
        })
        .catch(err => {
          console.warn(`[NlyAdminlteVue warn]: ${err}`);
        });
    },

    // 删除数据
    deleteData(row) {
      const selectedData = [
        {
          user_id: row.item.id,
          base_user_id: row.item.base_user
        }
      ];

      const obj = this;
      this.$api.HttpsUserList.deleteUser(obj, selectedData);
    },

    // 删除弹框
    showDeleteMsgBox(row) {
      const username = row.item.username;
      const h = this.$createElement;
      const msg = `您将删除用户 ${username} `;
      const msgVnodes = h(
        "span",
        { class: "text-sm", style: { "font-weight": 700 } },
        msg
      );
      this.$nlyaModal
        .msgBoxConfirm([msgVnodes], {
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "确定",
          cancelTitle: "取消",
          footerClass: "p-2",
          hideHeader: true,
          centered: true
        })
        .then(value => {
          if (value) {
            this.deleteData(row);
          }
        })
        .catch(err => {
          console.warn(`[NlyAdminlteVue warn]: ${err}`);
        });
    },

    // 批量删除弹框
    showDeleteListMsgBox() {
      if (this.selected.length === 0) {
        const toastVnode = {
          message: this.$renderContext.deleteUserMsgBox.message,
          variant: this.$renderContext.deleteUserMsgBox.variant,
          title: this.$renderContext.deleteUserMsgBox.title,
          content: this.$renderContext.deleteUserMsgBox.content
        };
        const obj = this;
        this.$toast(obj, toastVnode);

        return;
      }
      const usernameList = [];
      this.selected.forEach(item => {
        usernameList.push(item.username);
      });
      const username = usernameList.toString();
      const count = usernameList.length;
      const h = this.$createElement;
      const msg = `您将删除 ${username} 共计 ${count} 个 用户`;
      const msgVnodes = h(
        "span",
        { class: "text-sm", style: { "font-weight": 700 } },
        msg
      );
      this.$nlyaModal
        .msgBoxConfirm([msgVnodes], {
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "确定",
          cancelTitle: "取消",
          footerClass: "p-2",
          hideHeader: true,
          centered: true
        })
        .then(value => {
          if (value) {
            this.deleteListData();
          }
        })
        .catch(err => {
          console.warn(`[NlyAdminlteVue warn]: ${err}`);
        });
    },

    // 批量删除数据
    deleteListData() {
      const selectedData = this.selected.map(item => {
        const result = {
          user_id: item.id,
          base_user_id: item.base_user
        };
        return result;
      });

      const obj = this;
      this.$api.HttpsUserList.deleteListUser(obj, selectedData);
    },

    // 查询数据
    queryData() {
      if (
        !this.filter.username &&
        !this.filter.userphone &&
        !this.filter.useremail &&
        !this.filter.usertype &&
        this.filter.isdelete === null
      ) {
        const toastVnode = {
          message: this.$renderContext.allUserQueryCriteria.message,
          variant: this.$renderContext.allUserQueryCriteria.variant,
          title: this.$renderContext.allUserQueryCriteria.title,
          content: this.$renderContext.allUserQueryCriteria.content
        };
        const obj = this;
        this.$toast(obj, toastVnode);
        return;
      }

      this.currentPage = 1;
      const obj = this;
      obj.isBusy = true;
      const params = {
        size: this.perPageSize,
        page: this.currentPage,
        username__icontains: this.filter.username,
        user_type: this.filter.usertype,
        user_phone__icontains: this.filter.userphone,
        user_email__icontains: this.filter.useremail,
        is_delete: this.filter.isdelete
      };
      this.$api.HttpsUserList.getUserList(obj, params);
    },

    // 重置查询条件
    resetQueryCriteria() {
      this.filter = {
        username: "",
        userphone: "",
        useremail: "",
        usertype: null,
        isdelete: null
      };
      const toastVnode = {
        message: this.$renderContext.allUserResetQueryCriteria.message,
        variant: this.$renderContext.allUserResetQueryCriteria.variant,
        title: this.$renderContext.allUserResetQueryCriteria.title,
        content: this.$renderContext.allUserResetQueryCriteria.content
      };
      const obj = this;
      this.$toast(obj, toastVnode);
    },

    // 刷新数据
    refreshData() {
      const obj = this;
      obj.isBusy = true;
      const params = {
        size: this.perPageSize,
        page: this.currentPage,
        username__icontains: this.filter.username,
        user_type: this.filter.usertype,
        user_phone__icontains: this.filter.userphone,
        user_email__icontains: this.filter.useremail,
        is_delete: this.filter.isdelete
      };
      this.$api.HttpsUserList.getUserList(obj, params);
    },

    // 第一页函数
    firstFunction() {
      const obj = this;
      obj.isBusy = true;
      const params = {
        page: 1,
        size: this.perPageSize,
        username__icontains: this.filter.username,
        user_type: this.filter.usertype,
        user_phone__icontains: this.filter.userphone,
        user_email__icontains: this.filter.useremail,
        is_delete: this.filter.isdelete
      };
      this.$api.HttpsUserList.getUserList(obj, params);
    },

    // 上一页函数
    prevFunction() {
      const obj = this;
      obj.isBusy = true;
      const params = {
        page: this.currentPage - 1,
        size: this.perPageSize,
        username__icontains: this.filter.username,
        user_type: this.filter.usertype,
        user_phone__icontains: this.filter.userphone,
        user_email__icontains: this.filter.useremail,
        is_delete: this.filter.isdelete
      };
      this.$api.HttpsUserList.getUserList(obj, params);
    },

    // 当前一页函数
    currentFunction() {
      const obj = this;
      obj.isBusy = true;
      const params = {
        page: this.$refs.pagination.tempalteCurrentPage,
        size: this.perPageSize,
        username__icontains: this.filter.username,
        user_type: this.filter.usertype,
        user_phone__icontains: this.filter.userphone,
        user_email__icontains: this.filter.useremail,
        is_delete: this.filter.isdelete
      };
      this.$api.HttpsUserList.getUserList(obj, params);
    },

    // 下一页函数
    nextFunction() {
      const obj = this;
      obj.isBusy = true;
      const params = {
        page: this.currentPage + 1,
        size: this.perPageSize,
        username__icontains: this.filter.username,
        user_type: this.filter.usertype,
        user_phone__icontains: this.filter.userphone,
        user_email__icontains: this.filter.useremail,
        is_delete: this.filter.isdelete
      };
      this.$api.HttpsUserList.getUserList(obj, params);
    },

    // 最后一页函数
    lastFunction() {
      const obj = this;
      obj.isBusy = true;
      const params = {
        page: this.$refs.pagination.nlyPgPages,
        size: this.perPageSize,
        username__icontains: this.filter.username,
        user_type: this.filter.usertype,
        user_phone__icontains: this.filter.userphone,
        user_email__icontains: this.filter.useremail,
        is_delete: this.filter.isdelete
      };
      this.$api.HttpsUserList.getUserList(obj, params);
    },

    // 改变每页数量函数
    sizeFunction() {
      const obj = this;
      obj.isBusy = true;
      const params = {
        page: this.$refs.pagination.tempalteCurrentPage,
        size: this.perPageSize,
        keyword: this.keyWord,
        username__icontains: this.filter.username,
        user_type: this.filter.usertype,
        user_phone__icontains: this.filter.userphone,
        user_email__icontains: this.filter.useremail,
        is_delete: this.filter.isdelete
      };
      this.$api.HttpsUserList.getUserList(obj, params);
    },

    // 更新当前页码
    getCurrentPage(data) {
      this.currentPage = data;
    }
  },
  mounted() {
    const obj = this;
    obj.isBusy = true;
    const params = {
      size: this.perPageSize,
      page: 1,
      username__icontains: this.filter.username,
      user_type: this.filter.usertype,
      user_phone__icontains: this.filter.userphone,
      user_email__icontains: this.filter.useremail,
      is_delete: this.filter.isdelete
    };
    this.$api.HttpsUserList.getUserList(obj, params);
  },
  watch: {
    editorModal(newVal) {
      if (!newVal) {
        this.feedback = {
          usernameInvalid: "",
          phoneInvalid: "",
          emailInvalid: "",
          levelInvalid: "",
          expInvalid: ""
        };
        this.valid = {
          usernameState: "novalid",
          phoneState: "novalid",
          emailState: "novalid",
          levelState: "novalid",
          expState: "novalid"
        };
        this.editor = {
          id: undefined,
          username: undefined,
          base_user: undefined,
          usertype: undefined,
          user_phone: undefined,
          user_email: undefined,
          user_level: undefined,
          user_exp: undefined,
          user_last_login_time: undefined,
          user_birthday: undefined,
          user_gender: undefined,
          user_ip: undefined,
          create_date: undefined,
          update_date: undefined,
          is_delete: undefined,
          create_user: undefined,
          update_user: undefined
        };
        this.selectUserBirthday = {
          startDate: null,
          endDate: null
        };
      }
    }
  }
};
</script>

<style>
.user-image {
  border-radius: 50%;
  height: 2.1rem;
  margin-right: 10px;
  margin-top: -2px;
  width: 2.1rem;
}
</style>
