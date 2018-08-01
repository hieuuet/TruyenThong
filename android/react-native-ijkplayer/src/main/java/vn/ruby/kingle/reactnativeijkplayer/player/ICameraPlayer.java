package vn.ruby.kingle.reactnativeijkplayer.player;


import vn.ruby.kingle.reactnativeijkplayer.entry.CameraInfo;

/**
 * Created by tuanpa on 3/13/15.
 * CameraPlayer Interface
 */
public interface ICameraPlayer {
    void startTalk();

    void stopTalk();

    boolean isListening();

    void startListen();

    void stopListen();

//    public boolean isViewRTSP();

//    public void viewRTSP();

    CameraInfo getCamera();

//    public void stopViewRTSP();

    String getResolution();

    void setResolution(int i);

    boolean isTalking();

    void addCameraPlayerListener(ICameraPlayerEvent l);

    void removeCameraPlayerListener(ICameraPlayerEvent l);

    void start(CameraInfo info);


}
