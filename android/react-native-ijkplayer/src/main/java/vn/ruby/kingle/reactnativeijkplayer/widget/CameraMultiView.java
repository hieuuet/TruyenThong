package vn.ruby.kingle.reactnativeijkplayer.widget;

/**
 * Created by vuong.lequoc on 27/03/2018.
 */

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.util.Log;
import android.view.GestureDetector;
import android.view.MotionEvent;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.Toast;

import java.lang.reflect.Array;
import java.util.ArrayList;

import tv.danmaku.ijk.media.player.IMediaPlayer;
import vn.ruby.kingle.reactnativeijkplayer.activities.FullScreenVideoActivity;
import vn.ruby.kingle.reactnativeijkplayer.common.Constants;
import vn.ruby.kingle.reactnativeijkplayer.common.OnSwipeTouchListener;
import vn.ruby.kingle.reactnativeijkplayer.common.Utils;
import vn.ruby.kingle.reactnativeijkplayer.entry.CameraInfo;
import vn.ruby.kingle.reactnativeijkplayer.widget.media.IjkVideoView2;


public class CameraMultiView extends FrameLayout {

    private int padding = 4;
    private int numPlayer = 4;
    private int numCol = 0;
    private int index = 0;
    private int cntRetry = 0;
    private ArrayList<IjkVideoView2> cameraSingleViews = new ArrayList<IjkVideoView2>();

    private ArrayList<CameraInfo> camList;

    public CameraMultiView(Context context) {
        super(context);
        init();
    }

    public int getNumCol() {
        return numCol;
    }

    public void setNumCol(int numCol) {
        this.numCol = numCol;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public ArrayList<CameraInfo> getCamList() {
        return camList;
    }

    public void setCamList(ArrayList<CameraInfo> camList) {
        this.camList = camList;
    }

    public CameraMultiView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public CameraMultiView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    void init() {
        for (int i = 0; i < numPlayer; i++) {
            IjkVideoView2 c = new IjkVideoView2(getContext());
            cameraSingleViews.add(c);


            this.addView(c);
        }
    }

    public void relayout(int numCol, final int indexPage) {
        for (IjkVideoView2 c : cameraSingleViews) {
            c.setVisibility(GONE);
        }

        if(numCol == 1) {
            for (IjkVideoView2 c :cameraSingleViews) {

                c.setVisibility(VISIBLE);
                int width = Utils.calculateSizeWidth((Activity) getContext(), 1);
                int height = Utils.calculateSizeHeight((Activity) getContext(), 1);
                LayoutParams lp = new LayoutParams(width - 2 * padding, height - 2 * padding);
                lp.setMargins(padding, padding, width - padding, height - padding);
                c.setLayoutParams(lp);

                c.setOnTouchListener(new OnTouchListener() {
                    @Override
                    public boolean onTouch(View v, MotionEvent event) {
                        if (event.getAction() == MotionEvent.ACTION_DOWN) {

                            int u = indexPage;
                            if(u < camList.size()) {
                                stop();
                                CameraInfo camInfo = camList.get(u);
                                if(camInfo != null) {
                                    Intent intent = new Intent(getContext(), FullScreenVideoActivity.class);
                                    Bundle extra = new Bundle();
                                    extra.putSerializable("cameraInfo", camInfo);
                                    intent.putExtra("extra", extra);
                                    getContext().startActivity(intent);
                                }
                                return true;
                            }
                        }
                        return false;
                    }
                });



                break;

            }
        } else {

            int width = Utils.calculateSizeWidth((Activity) getContext(), Constants.COLUMN);
            int height = Utils.calculateSizeHeight((Activity) getContext(), Constants.COLUMN);
            for (int row = 0; row < 2; row++) {
                for (int col = 0; col < 2; col++) {
                    final int index = row * 2 + col;
                    int left = (col + 1) * padding + col * width;
                    int top = (row + 1) * padding + row * height;

                    IjkVideoView2 c = cameraSingleViews.get(index);
                    LayoutParams lp = new LayoutParams(width, height);
                    lp.setMargins(left, top, left + width, top + height);
                    c.setLayoutParams(lp);
                    c.setVisibility(VISIBLE);
                    c.setOnTouchListener(new OnTouchListener() {
                        @Override
                        public boolean onTouch(View v, MotionEvent event) {
                            if (event.getAction() == MotionEvent.ACTION_DOWN) {

                                int u = indexPage * 4 + index;
                                if(u < camList.size()) {
                                    stop();
                                    CameraInfo camInfo = camList.get(u);
                                    Log.d("CamMulti", index + "");
                                    if(camInfo != null) {
                                        Intent intent = new Intent(getContext(), FullScreenVideoActivity.class);
                                        Bundle extra = new Bundle();
                                        extra.putSerializable("cameraInfo", camInfo);
                                        intent.putExtra("extra", extra);
                                        getContext().startActivity(intent);
                                    }
                                    return true;
                                }
                            }
                            return false;
                        }
                    });

                }
            }
        }

    }

    public void play(ArrayList<CameraInfo> camList, int numCol, int index, boolean isLocal) {
        this.camList = camList;
        Log.d("Play getUrl: ", camList.get(0).getUrl());
        Log.d("Play getUrl_local: ", camList.get(0).getUrl_local());
        // set camera list
        setCamList(this.camList);
        setNumCol(numCol);
        setIndex(index);

        if (camList == null || camList.isEmpty()) {
            for (int i = 0; i < numPlayer; i++) {
                cameraSingleViews.get(i).setVideoPath(null);
            }
        } else {
            if(numCol == 1) {
                for (int i = 0; i < numPlayer; i++) {


                    Log.d("DEBUG", "for for for");
                    IjkVideoView2 c = cameraSingleViews.get(i);

                    CameraInfo camInfo = camList.get(index);
                    if(camInfo != null) {
//                        c = new IjkVideoView2(getContext());
                        c.setRender(IjkVideoView2.RENDER_TEXTURE_VIEW);
                        c.setPlayerConfig(IjkVideoView2.PV_PLAYER__IjkMediaPlayer, false, false, false, false, "", false, true, false);
                        if(isLocal) {
                            c.setVideoPath(camInfo.getUrl_local());
                        } else {
                            c.setVideoPath(camInfo.getUrl());
                        }
                        c.setOnErrorListener(mErrorListener);
                    }
                }
            } else {
//                for(int i = camList.size(); i < 4 * (index + 1); ++i) {
//                    camList.add(new CameraInfo());
//                }
                for (int i = 0; i < numPlayer; i++) {


                    Log.d("DEBUG", "for for for");
                    IjkVideoView2 c = cameraSingleViews.get(i);

                    int u = index * 4 + i;
                    if(u < camList.size()) {
                        CameraInfo camInfo = camList.get(u);
                        if (camInfo != null) {
                            if (!TextUtils.isEmpty(camInfo.getUrl())) {
//                            this.addView(c);
//                                c = new IjkVideoView2(getContext());
                                c.setRender(IjkVideoView2.RENDER_TEXTURE_VIEW);
                                c.setPlayerConfig(IjkVideoView2.PV_PLAYER__IjkMediaPlayer, false, false, false, false, "", false, true, false);
                                if(isLocal) {
                                    c.setVideoPath(camInfo.getUrl_local());
                                } else {
                                    c.setVideoPath(camInfo.getUrl());
                                }
                                c.setOnErrorListener(mErrorListener);
                            } else {

                            }
                        } else {

                        }
                    } else {
                        c.setRender(IjkVideoView2.RENDER_NONE);
                        c.setBackgroundColor(Color.parseColor("#ff333333"));
                    }
                }
            }

        }

        relayout(numCol, index);
    }

    public void stop() {
        for (IjkVideoView2 c : cameraSingleViews) {
            c.stopPlayback();
            c.release(true);
            c.stopBackgroundPlay();
//            this.removeView(c);
        }
    }

    public void resume() {
        for (IjkVideoView2 c : cameraSingleViews) {
            c.resume();
        }
    }

    private IMediaPlayer.OnErrorListener mErrorListener =
            new IMediaPlayer.OnErrorListener() {
                public boolean onError(IMediaPlayer mp, int framework_err, int impl_err) {
                    Log.d("CameraMultiView", "Error: " + framework_err + "," + impl_err);
                    Log.d("size camList: ", getCamList().size() + "");
                    Log.d("NumCol: ", getNumCol() + "");
                    Log.d("Index: ", getIndex() + "");
                    ++cntRetry;
                    if(cntRetry == 1) {
                        stop();
                        play(getCamList(), getNumCol(), getIndex(), false);
                    }
                    return true;
                }
            };
}
