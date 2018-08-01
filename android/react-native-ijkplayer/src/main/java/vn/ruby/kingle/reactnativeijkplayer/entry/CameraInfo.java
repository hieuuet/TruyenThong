package vn.ruby.kingle.reactnativeijkplayer.entry;

import java.io.Serializable;

import vn.ruby.kingle.reactnativeijkplayer.widget.media.IjkVideoView2;

/**
 * Created by vuong.lequoc on 02/03/2018.
 */

public class CameraInfo implements Serializable {

    private String url;
    private String url_local;
    private String cameraName;

    public CameraInfo() {

    }

    public CameraInfo(String url, String url_local, String cameraName) {
        this.url = url;
        this.url_local = url_local;
        this.cameraName = cameraName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getCameraName() {
        return cameraName;
    }

    public void setCameraName(String cameraName) {
        this.cameraName = cameraName;
    }

    public String getUrl_local() {
        return url_local;
    }

    public void setUrl_local(String url_local) {
        this.url_local = url_local;
    }
}
