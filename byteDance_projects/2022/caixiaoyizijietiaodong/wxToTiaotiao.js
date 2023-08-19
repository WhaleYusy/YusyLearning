var fs = require('fs');
var path = require('path');


// �����еĺ�׺���ĳ�ttss�Լ�ttml
function fileDisply( filePath ){
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            //������ȡ�����ļ��б�
            files.forEach(function(filename){
                //��ȡ��ǰ�ļ��ľ���·��
                var filedir = path.join(filePath,filename);
                //�����ļ�·����ȡ�ļ���Ϣ������һ��fs.Stats����
                fs.stat(filedir,function(eror,stats){
                    if(eror){
                        console.warn('��ȡ�ļ�statsʧ��');
                    }else{
                        var isFile = stats.isFile();//���ļ�
                        var isDir = stats.isDirectory();//���ļ���
                        if(isFile){
                            var regcss = /(wxss)$/;
                            var regswan = /(wxml)$/
                            var regjs = /(js)$/
                            
                            //�����wxss��ת��ttss
                            if( regcss.test( filedir ) ){
                                let newPath = filedir.replace(regcss,'ttss');
                                reNameFile( filedir, newPath )
                            }
                            //�����swan���ļ�ת��ttml
                            if( regswan.test( filedir ) ){
                                let newPath = filedir.replace(regswan,'ttml');
                                /* ���޸ĺ��ļ����ݺ�ִ�еĻص��������޸��ļ��� */
                                let callback = function(){
                                    reNameFile( filedir, newPath )
                                }
                                /* ���޸ĺ��ļ����ݺ�ִ�еĻص��������޸��ļ��� */
                                amendText( filedir, callback )
                            }
                            //�����js�ļ������е�swanת��tt
                            if( regjs.test( filedir ) ){
                                amendSwanToTT( filedir )
                            }
                        }
                        if(isDir){
                            fileDisply(filedir);//�ݹ飬������ļ��У��ͼ����������ļ���������ļ�
                        }
                    }
                })
            })
        }
    })
}

fileDisply( path.resolve( __dirname ))

/**
 * �µ��ļ�·������ɵ��ļ�·�������ֻ���޸Ŀɺ�׺����ô�൱���޸��ļ�����
 * @param {�ɵ��ļ�·��} path 
 * @param {���ļ�·��} newPath 
 */
function reNameFile( path,newPath ){
    fs.rename( path, newPath, function(err){
        if(err){
            console.error(err);
            return;
        }
    })
}

/**
 * �޸��ļ�����
 * @param {��Ҫ�޸����ݵ��ļ�} path 
 * @param {�ļ��޸ĺ���Ҫִ�еĻص�} callback 
 */
function amendText( path ,callback){
    fs.readFile(path,'utf8',function(err,files){
        console.log(err,files)
        var result = files.replace(/wx:for/g,'tt:for').replace(/wx:if/g,'tt:if').replace(/wx:for-item/g,'tt:for-item').replace(/wx:for-index/g,'tt:for-index').replace(/wx:key/g,'tt:key').replace(/\.wxml/g,'.ttml');
        //var result = files.replace(/s-if/g,'tt:if');
        
        fs.writeFile( path, result, 'utf8', function (err) {
            if (err) return console.log(err);
            callback() 
        });
    
    })
}

/**
 * �޸�js�е�wxȫ�ֱ�����Ϊtt
 * @param {��Ҫ�޸ĵ��ļ�} path 
 */
function amendSwanToTT( path ){
    fs.readFile(path,'utf8',function(err,files){
        console.log(err,files)
        var result = files.replace(/wx\./g,'tt.');
        fs.writeFile( path, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    
    })
}