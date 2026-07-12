from flask import request, jsonify, send_file,current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from routes import api_bp
from models import File, User
from extensions import db
import os
import uuid
from werkzeug.utils import secure_filename

@api_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_file():
    """Upload a file"""
    user_id = get_jwt_identity()
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    # Generate unique filename
    original_filename = secure_filename(file.filename)
    file_extension = original_filename.rsplit('.', 1)[1].lower() if '.' in original_filename else ''
    unique_filename = f"{uuid.uuid4().hex}.{file_extension}" if file_extension else uuid.uuid4().hex
    
    # Save file
    upload_folder = current_app.config['UPLOAD_FOLDER']
    os.makedirs(upload_folder, exist_ok=True)
    filepath = os.path.join(upload_folder, unique_filename)
    file.save(filepath)
    
    # Create file record
    new_file = File(
        filename=original_filename,
        stored_filename=unique_filename,
        filepath=filepath,
        user_id=user_id
    )
    
    db.session.add(new_file)
    db.session.commit()
    
    return jsonify({'message': 'File uploaded successfully', 'file': new_file.to_dict()}), 201

@api_bp.route('/files', methods=['GET'])
@jwt_required()
def get_files():
    """Get all files for the current user"""
    user_id = get_jwt_identity()
    files = File.query.filter_by(user_id=user_id).all()
    
    return jsonify({'files': [file.to_dict() for file in files]}), 200

@api_bp.route('/download/<int:file_id>', methods=['GET'])
@jwt_required()
def download_file(file_id):
    """Download a file"""
    user_id = get_jwt_identity()
    
    file = File.query.filter_by(id=file_id, user_id=user_id).first()
    
    if not file:
        return jsonify({'error': 'File not found'}), 404
    
    if not os.path.exists(file.filepath):
        return jsonify({'error': 'File not found on disk'}), 404
    
    return send_file(file.filepath, as_attachment=True, download_name=file.filename)

@api_bp.route('/files/<int:file_id>', methods=['DELETE'])
@jwt_required()
def delete_file(file_id):
    """Delete a file"""
    user_id = get_jwt_identity()
    
    file = File.query.filter_by(id=file_id, user_id=user_id).first()
    
    if not file:
        return jsonify({'error': 'File not found'}), 404
    
    # Delete file from disk
    if os.path.exists(file.filepath):
        os.remove(file.filepath)
    
    # Delete from database
    db.session.delete(file)
    db.session.commit()
    
    return jsonify({'message': 'File deleted successfully'}), 200
