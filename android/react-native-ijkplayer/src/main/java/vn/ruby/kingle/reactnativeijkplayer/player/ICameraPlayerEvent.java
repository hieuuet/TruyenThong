package vn.ruby.kingle.reactnativeijkplayer.player;

import android.graphics.Bitmap;

/**
 * Created by tuanpa on 8/1/2014.
 * The camera player events declaration
 */
public interface ICameraPlayerEvent {
    void onStartConnect();

    void onConnected();

    void onCouldNotConnect();

    void onBitmapCached(Bitmap bmp, String id);

//    public void onSnapshotTaken(Bitmap bmp, int camID);

    void onStopPlay();

//    public void onSizeChange(int width, int height);

    void onTalkError();

    void onListenError();
}
