package vn.ruby.kingle.reactnativeijkplayer.activities;

import android.app.Activity;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.RelativeLayout;
import android.widget.TableLayout;
import android.widget.TextView;

import java.util.ArrayList;

import tv.danmaku.ijk.media.player.IjkMediaPlayer;
import tv.danmaku.ijk.media.player.misc.ITrackInfo;
import vn.ruby.kingle.reactnativeijkplayer.R;
import vn.ruby.kingle.reactnativeijkplayer.application.Settings;
import vn.ruby.kingle.reactnativeijkplayer.common.Utils;
import vn.ruby.kingle.reactnativeijkplayer.content.RecentMediaStorage;
import vn.ruby.kingle.reactnativeijkplayer.entry.CameraInfo;
import vn.ruby.kingle.reactnativeijkplayer.fragments.TracksFragment;
import vn.ruby.kingle.reactnativeijkplayer.widget.media.AndroidMediaController;
import vn.ruby.kingle.reactnativeijkplayer.widget.media.IjkVideoView;
import vn.ruby.kingle.reactnativeijkplayer.widget.media.IjkVideoView2;
import vn.ruby.kingle.reactnativeijkplayer.widget.media.IjkVideoView3;

public class FullScreenVideoActivity extends AppCompatActivity implements TracksFragment.ITrackHolder {
    private static final String TAG = "FullScreenVideoActivity";


    private IjkVideoView3 mVideoView;
    private TextView cameraName;
    private RelativeLayout rlVideoDetail;

    private TextView tv_title;
    private ImageButton img_back;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_video_detail);


        // handle arguments
//        mVideoPath = getIntent().getStringExtra("videoPath");
        Bundle extra = getIntent().getBundleExtra("extra");
        CameraInfo camInfo = (CameraInfo) extra.getSerializable("cameraInfo");

        // init UI
        /*Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        // add back arrow to toolbar
        if (getSupportActionBar() != null){
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
            getSupportActionBar().setDisplayShowHomeEnabled(true);
        }*/

        this.tv_title = (TextView) findViewById(R.id.tv_title);
        this.img_back = (ImageButton) findViewById(R.id.img_back);

        this.tv_title.setText(R.string.detail_camera);
        this.img_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                onBackPressed(); // close this activity and return to preview activity (if there is any)
            }
        });


        // init player
        IjkMediaPlayer.loadLibrariesOnce(null);
        IjkMediaPlayer.native_profileBegin("libijkplayer.so");

        mVideoView = (IjkVideoView3) findViewById(R.id.video_view);
        cameraName = (TextView) findViewById(R.id.cameraName);

        rlVideoDetail = (RelativeLayout) findViewById(R.id.rlVideoDetail);
//        rlVideoDetail.getLayoutParams().height = Utils.calculateSizeHeight(this, 1);
//        rlVideoDetail.getLayoutParams().width = Utils.calculateSizeWidth(this, 1);

        cameraName.setText(camInfo.getCameraName());

        // prefer mVideoPath
        if (camInfo.getUrl_local() != null) {
//            mVideoView = new IjkVideoView3(this);
            mVideoView.setRender(IjkVideoView3.RENDER_TEXTURE_VIEW);
            mVideoView.setPlayerConfig(IjkVideoView3.PV_PLAYER__IjkMediaPlayer, false, false, false, false, "", false, true, false);
            mVideoView.setVideoPath(camInfo.getUrl_local());
        }
        else if(camInfo.getUrl() != null) {
            mVideoView.setRender(IjkVideoView3.RENDER_TEXTURE_VIEW);
            mVideoView.setPlayerConfig(IjkVideoView3.PV_PLAYER__IjkMediaPlayer, false, false, false, false, "", false, true, false);
            mVideoView.setVideoPath(camInfo.getUrl());

        } else {
            Log.e(TAG, "Null Data Source\n");
            finish();
            return;
        }
        mVideoView.start();
    }


    @Override
    protected void onStop() {
        super.onStop();

        if (!mVideoView.isBackgroundPlayEnabled()) {
            mVideoView.stopPlayback();
            mVideoView.release(true);
            mVideoView.stopBackgroundPlay();
        } else {
            mVideoView.enterBackground();
        }
        IjkMediaPlayer.native_profileEnd();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
//        getMenuInflater().inflate(R.menu.menu_player, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (item.getItemId() == android.R.id.home) {
            finish(); // close this activity and return to preview activity (if there is any)
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public ITrackInfo[] getTrackInfo() {
        if (mVideoView == null)
            return null;

        return mVideoView.getTrackInfo();
    }

    @Override
    public void selectTrack(int stream) {
        mVideoView.selectTrack(stream);
    }

    @Override
    public void deselectTrack(int stream) {
        mVideoView.deselectTrack(stream);
    }

    @Override
    public int getSelectedTrack(int trackType) {
        if (mVideoView == null)
            return -1;

        return mVideoView.getSelectedTrack(trackType);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        finish();
        Log.d("FullScreenVideoActivity", "Back hardware click");
    }
}
