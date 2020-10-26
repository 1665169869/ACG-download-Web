import re
import sys
import json
import requests

dns_url = '//(.+?)/'
url = input("请输入要爬取的url:")

url_dns = re.search(dns_url, url) # 寻找主域名
regular = re.compile('<div class=\"field-item even\"><a href=\"(.+?)"><')# 正则表达式
regular_title = re.compile('title=\"(.+?)\" /></a></div></div></div>')# 正则表达式

if not url_dns:
    print("url错误")
    sys.exit(0) # 退出程序
else:
    url_dns = re.search(dns_url, url).span()
url_dns_logic = url.startswith(dns_url,url_dns[0],url_dns[1]) # 是否存在主域名

if url_dns_logic == True: # 判断主域名是否等于dns_url
    print("url正确","\n开始获取网页内容")

iwara_url = requests.get(url) # 爬取URL网页源码
iwara_url.encoding = 'utf-8' # 编码UTF8以防乱码
iwara_list = regular.findall(iwara_url.text) # 获取视频列表数组
iwara_title = regular_title.findall(iwara_url.text) #视频名字列表
iwara_videos = len(iwara_list) # 视频总数量 一页一共36个
iwara_api = "https://ecchi.iwara.tv/api/video" # i站下载地址api
iwara_download = []

if iwara_videos == 0:
    print("未获取到视频。")
    sys.exit(0)
print('视频此页总数：' + str(iwara_videos))
print("准备获取视频下载地址，请稍后。（中途请勿关闭程序或电脑）")


for i in range(0,iwara_videos):
    links_text = re.findall("[^videos][A-Z-a-z-0-9]*",iwara_list[i])[1] # 视频ID链接
    if links_text != '/':
        print(links_text) #测试，记得做好屏蔽
        iwara_video_id = links_text 
        iwara_download_json = json.loads(requests.get(iwara_api + iwara_video_id).text)  #列表list
        '''
        上面这一行的意思是获取下载地址json
        api + 视频ID
        '''
        iwara_download.append(iwara_download_json[0]['uri']) 
        '''
        0 Source 1:540p 2:360p 
        如果没有540p的话默认是这样的：
        0 Source 1:360p 
        可以用《iwara_download_json[0]['resolution']》
        查看画质
        '''
        print("已获取第" + str(i + 1) + "个视频下载地址 " + iwara_video_id + ' 视频标题：' + iwara_title[i])

print("正在写入下载地址，文件保存在程序目录的download.txt,视频名字保存在title.txt")

iwara_videos_download = ""
iwara_videos_title = ""
for i in range(0,iwara_videos):
    iwara_videos_download = iwara_videos_download + iwara_download[i] + '\n'
    iwara_videos_title = iwara_videos_title + iwara_title[i] + '\n' 

open("download.txt", 'w+', encoding='utf-8').write(iwara_videos_download)
open('title.txt', 'w+', encoding='utf-8').write(iwara_videos_title)

print("写入完毕!")
