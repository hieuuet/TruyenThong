package vn.ruby.kingle.reactnativeijkplayer;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import vn.ruby.kingle.reactnativeijkplayer.activities.VideoList2Activity;
import vn.ruby.kingle.reactnativeijkplayer.activities.VideoListActivity;
import vn.ruby.kingle.reactnativeijkplayer.entry.CameraInfo;


/**
 * Created by vuong.lequoc on 26/02/2018.
 */

public class RNIJKModule extends ReactContextBaseJavaModule {

    // implements ActivityEventListener

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";
    private ArrayList<CameraInfo> camList;

    public RNIJKModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "IJKMediaPlayer";
    }

    @ReactMethod
    public void show(ReadableArray cameraList) {
        Log.d("TOAST", "Show msg");
//        Toast.makeText(getReactApplicationContext(), message, duration).show();

        camList = new ArrayList<CameraInfo>();
        for(int i = 0; i < cameraList.toArrayList().size(); ++i) {
            ReadableMap cam = cameraList.getMap(i);
            CameraInfo camInfo = new CameraInfo();
            if(cam.hasKey("id")) {

            }

            if(cam.hasKey("name")) {
                camInfo.setCameraName(cam.getString("name"));
            }

            if(cam.hasKey("url_local")) {
                camInfo.setUrl_local(cam.getString("url_local"));
            }

            if(cam.hasKey("url")) {
                camInfo.setUrl(cam.getString("url"));
            }
            camList.add(camInfo);

        }

        Activity currentActivity = getCurrentActivity();
        Intent intent = new Intent(currentActivity, VideoList2Activity.class);

        intent.putExtra("cameraList",camList);
//        intent.putExtra("videoTitle","RTSP");
        currentActivity.startActivity(intent);
    }


    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }


}
