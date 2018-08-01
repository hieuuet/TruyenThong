package vn.ruby.kingle.reactnativeijkplayer.adapter;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v7.widget.CardView;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import java.lang.reflect.Array;
import java.util.ArrayList;

import co.ceryle.fitgridview.FitGridAdapter;
import tv.danmaku.ijk.media.player.IjkMediaPlayer;
import tv.danmaku.ijk.media.player.widget.IjkVideoView;
import vn.ruby.kingle.reactnativeijkplayer.R;
import vn.ruby.kingle.reactnativeijkplayer.activities.FullScreenVideoActivity;
import vn.ruby.kingle.reactnativeijkplayer.common.Utils;
import vn.ruby.kingle.reactnativeijkplayer.entry.CameraInfo;
import vn.ruby.kingle.reactnativeijkplayer.widget.media.IjkVideoView2;

public class ItemAdapter extends FitGridAdapter {

    private Context context;
    private ArrayList<CameraInfo> cameraList;
    private int column = 0;

    private static final String TAG = "ItemAdapter";

    public ItemAdapter(Context context, ArrayList<CameraInfo> cameraList, int column) {
        super(context, R.layout.camera_item_2);
        this.context = context;
        this.column = column;
        this.cameraList = cameraList;
    }


    @Override
    public void onBindView(final int position, View itemView) {
        final IjkVideoView2 mVideoView = (IjkVideoView2) itemView.findViewById(R.id.video_view);
        TextView cameraName = (TextView) itemView.findViewById(R.id.cameraName);
        FrameLayout shutterView = (FrameLayout) itemView.findViewById(R.id.shutterView);

        Log.d("WIDTH: ", Utils.calculateSizeWidth((Activity) context, column) + "");
        Log.d("HEIGHT: ", Utils.calculateSizeHeight((Activity) context, column) + "");
        itemView.setLayoutParams(new ViewGroup.LayoutParams(Utils.calculateSizeWidth((Activity) context, column), Utils.calculateSizeHeight((Activity) context, column)));
        final CameraInfo camInfo = cameraList.get(position);


        // init player
        IjkMediaPlayer.loadLibrariesOnce(null);
        IjkMediaPlayer.native_profileBegin("libijkplayer.so");

        shutterView.setVisibility(View.VISIBLE);

        // prefer mVideoPath
        if(camInfo != null) {
            if (!TextUtils.isEmpty(camInfo.getUrl())) {
//                mVideoView = new IjkVideoView2(context);
                mVideoView.setRender(IjkVideoView2.RENDER_TEXTURE_VIEW);
                mVideoView.setPlayerConfig(IjkVideoView2.PV_PLAYER__IjkMediaPlayer, false, false, false, false, "", false, true, false);
                mVideoView.setVideoPath(camInfo.getUrl());
                cameraName.setText(camInfo.getCameraName());
                shutterView.setVisibility(View.GONE);
            } else {
                shutterView.setVisibility(View.GONE);
            }
        }
        else {
            shutterView.setVisibility(View.GONE);
        }


        mVideoView.start();

        itemView.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {
                mVideoView.stopPlayback();
                mVideoView.release(true);
                mVideoView.stopBackgroundPlay();
                IjkMediaPlayer.native_profileEnd();

                Intent intent = new Intent(context, FullScreenVideoActivity.class);
                Bundle extra = new Bundle();
                extra.putSerializable("cameraInfo", camInfo);
                intent.putExtra("extra", extra);
                context.startActivity(intent);
            }
        });
    }
}