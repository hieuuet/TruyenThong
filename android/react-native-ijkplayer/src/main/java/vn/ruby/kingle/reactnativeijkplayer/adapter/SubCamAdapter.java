package vn.ruby.kingle.reactnativeijkplayer.adapter;

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

import vn.ruby.kingle.reactnativeijkplayer.R;
import vn.ruby.kingle.reactnativeijkplayer.entry.CameraInfo;

/**
 * Created by vuong.lequoc on 22/03/2018.
 */

public class SubCamAdapter extends BaseAdapter {
    private Activity activity;
    private LayoutInflater inflater;
    private ArrayList<CameraInfo> camList;

    public SubCamAdapter(Activity activity, ArrayList<CameraInfo> camList) {
        this.activity = activity;
        this.camList = camList;
    }

    @Override
    public int getCount() {
        return camList.size();
    }

    @Override
    public Object getItem(int location) {
        return camList.get(location);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        if (inflater == null)
            inflater = (LayoutInflater) activity
                    .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        if (convertView == null)
            convertView = inflater.inflate(R.layout.camera_sub_item, null);


        TextView camName = (TextView) convertView.findViewById(R.id.camName);

        // getting movie data for the row
        CameraInfo cam = camList.get(position);

        // camera name
        camName.setText(cam.getCameraName());

        return convertView;
    }
}
