<template>
    <view>
        <view v-if="multiple" class="cu-bar bg-white">
            <view class="action">
                图片上传
            </view>
            <view class="action">
                {{fileList.length}}/4
            </view>
        </view>
        <view class="cu-form-group" :class="multiple ? '' : 'padding-top-sm'">
            <view class="grid col-4 grid-square flex-sub">
                <view class="bg-img" v-for="(item,index) in fileList" :key="index" @tap="previewImg" :data-index="index">
                    <image v-if="item.upload_percent === 100" :src="fileList[index].path_server" mode="aspectFill"></image>
                    <view v-else style="display: block">
                        <image :src="fileList[index].path" mode="aspectFill"></image>
                        <view class="text-white" style="position:absolute;top:35%;left:0;right:0;text-align:center">
                            {{item.upload_percent}}%
                        </view>
                    </view>
                    <view class="cu-tag bg-red" @tap.stop="deleteImg" :data-index="index">
                        <text class='cuIcon-close'></text>
                    </view>
                </view>
                <view v-show="isMore"  class="solids" @tap="chooseImage" v-if="fileList.length<4">
                    <text class='cuIcon-cameraadd'></text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: 'hm-image',
        model: {
            prop: 'fileId',
            event: 'change'
        },
        props: {
            fileId: {
                type: String,
                default: ''
            },
            multiple: {
                type: Boolean,
                default: false
            },
            config: {
                type: Object,
                default: function() {
                    return {
                        appCode: 'foundation',
                        /**
                         *  [可选]{boolean}文件上传后，是否设置为已决状态；（因为文件和业务数据是分开保存的）
                         *  1.如果该值设置成未决状态，就是临时文件，那么上传后只保留一天，因此需要在保存业务数据后，调用文件服务接口将文件设置成已决；
                         *  2.如果设置成已决状态，业务数据保存后，服务端就不需要额外处理
                         *  @default false
                         */
                        confirm: true,
                        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
                        sourceType: ['album', 'camera'] //album 从相册选图，camera 使用相机，默认二者都有
                    }
                }
            }
        },
        mounted() {
            // this.loadImageList()
        },
        computed: {
            isMore() {
                return (!this.multiple && this.fileList.length < 1) ||
                    (this.multiple && this.fileList.length < 4)
            },
            isCamera() {
                return this.config.sourceType.length === 1 && this.config.sourceType.includes('camera')
            }
        },
        data() {
            return {
                fileServerUrl: 'http://192.168.1.101:6401',
                previewImgList: [],
                fileList: [],
                confirm: this.config.confirm || false
            }
        },
        methods: {
            async loadImageList() {
                if (!this.fileId) {
                    return;
                }
                let param = {
                    groupId: this.fileId
                };
                const data = await this.$http.get('/file/metas', param);
                if (data['code'] === 'OK' && data['fileMetas']) {
                    const fileMetas = data['fileMetas'];
                    this.fileList = [];
                    this.previewImgList = [];
                    for (let i = 0, len = fileMetas.length; i < len; i++) {
                        this.fileList.push({
                            'path_server': this.getImageUrl(fileMetas[i].fileId)
                        });
                        this.fileList[i]['upload_percent'] = 100;
                        this.fileList[i]['fileId'] = fileMetas[i].fileId;
                        this.previewImgList.push(this.getImageUrl(fileMetas[i].fileId));
                    }
                }
            },
            async deleteImg(e) {
                const index = e.currentTarget.dataset.index;
                const deletefile = this.fileList.splice(index, 1);
                this.previewImgList.splice(index, 1);

                /*const data = await this.$http.post('/file/delete', {
                    fileId: deletefile[0].fileId
                });

                if (data['code'] === 'OK') {
                    if (!this.multiple || this.fileList.length === 0) {
                        this.$emit('change', '');
                    }
                }*/
            },
            getImageUrl(imageId, imageWidth = 120, imageHeight = 120) {
                return `${this.fileServerUrl}/file/img/${imageId}_${imageWidth}x${imageHeight}`;
            },
            // 上传文件
            async upload_file_server(file) {
                const param = {
                    appCode: this.config.appCode
                }
                if (this.confirm) {
                    param["confirm"] = "1";
                }
                if (this.fileId) {
                    param['groupId'] = this.fileId;
                }
                const that = this;
                const upload_task = await uni.uploadFile({
                    url: that.fileServerUrl + '/file/upload',
                    // #ifdef MP-ALIPAY
                    fileType: 'image',
                    // #endif
                    filePath: file['path'],
                    name: 'file',
                    formData: param,
                    success(res) {
                        if (res.statusCode === 200) {
                            let data = JSON.parse(res.data);
                            if (data.code === 'OK') {
                                let pathServer = that.getImageUrl(data.fileId);
                                file['path_server'] = pathServer;
                                file['fileId'] = data.fileId;
                                if (!that.fileId) {
                                    that.$emit('change', data.fileId);
                                }
                            }
                        }
                    },
                    fail(err) {
                        uni.showLoading({
                            title: '上传失败!'
                        });
                        setTimeout(() => {
                            uni.hideLoading();
                        }, 2000)
                    }
                });

                upload_task.onProgressUpdate((res) => {
                    file['upload_percent'] = res.progress
                });
            },
            chooseImage() {
                // 配置项
                const config = {
                    sourceType: this.config.sourceType,
                    sizeType: this.config.sizeType
                };
                const that = this;
                uni.chooseImage({
                    count: 1,
                    sizeType: config.sizeType,
                    sourceType: config.sourceType,
                    success(res) {
                        console.log("image:" + JSON.stringify(res));
                        const image = res.tempFiles[0];
                        image['upload_percent'] = 0;
                        image['path_server'] = '';
                        that.fileList.push(image);
                        // that.upload_file_server(that.fileList[that.fileList.length - 1]);
                        that.previewImgList = that.previewImgList.concat(res.tempFilePaths);
                    }
                })
            },
            previewImg(e) {
                const index = e.currentTarget.dataset.index;
                uni.previewImage({
                    current: this.previewImgList[index],
                    urls: this.previewImgList
                });
            }
        },
        /**
         * original 原图，compressed 压缩图，默认二者都有
         */
        SIZE_TYPE: {
            ORIGINAL: 'original',
            COMPRESSED: 'compressed',
            ALL: ['original', 'compressed']
        },
        /**
         * album 从相册选图，camera 使用相机，默认二者都有
         */
        SOURCE_TYPE: {
            ALBUM: ['album'],
            CAMERA: ['camera'],
            ALL: ['album', 'camera']
        }
    }
</script>

<style>
</style>
